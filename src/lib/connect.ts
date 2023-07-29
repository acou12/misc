import type * as peerjsType from 'peerjs';
import type { Entity } from './song';

export enum ConnectionStatus {
	CONNECTING,
	WAITING,
	CONNECTED,
	DISCONNECTED
}

export enum ConnectionType {
	HOST,
	CLIENT
}

export type DataTransfer =
	| {
			type: 'set-song';
			youtubeId: string;
	  }
	| {
			type: 'set-queue';
			queue: string[];
	  }
	| {
			type: 'set-progress';
			progress: number;
	  }
	| {
			type: 'set-playing-status';
			playing: boolean;
	  };

const prefix = 'aydenmc-music-';

export class Connection {
	peer: peerjsType.Peer;
	connection: peerjsType.DataConnection | undefined = undefined;
	status: ConnectionStatus = ConnectionStatus.CONNECTING;
	// whether this connection is connecting to or hosting the peer-to-peer instance
	type: ConnectionType = ConnectionType.HOST;

	private setStatus(newStatus: ConnectionStatus) {
		this.status = newStatus;
		this.onStatusChange();
	}
	constructor(
		private peerjs: typeof import('peerjs'),
		private room: string,
		private onStatusChange: () => void,
		private handleData: (data: DataTransfer) => void
	) {
		this.peer = new peerjs.Peer();
	}

	init() {
		const peerjsRoom = `${prefix}${this.room}`;
		this.onStatusChange();

		this.peer.once('open', () => {
			this.connection = this.peer.connect(peerjsRoom);
			this.connection.once('open', () => {
				this.type = ConnectionType.CLIENT;
				this.setStatus(ConnectionStatus.CONNECTED);
			});
			this.connection.on('data', (data) => this.handleData(data as DataTransfer));
		});
		this.peer.once('error', (err) => {
			console.log(err.message);
			// the room doesn't exist, so let's create it!
			this.peer = new this.peerjs.Peer(peerjsRoom);
			this.peer.once('open', () => {
				this.setStatus(ConnectionStatus.WAITING);
			});
			this.peer.on('connection', (connection) => {
				this.connection = connection;
				this.type = ConnectionType.HOST;
				this.setStatus(ConnectionStatus.CONNECTED);
				this.connection.on('data', (data) => {
					console.log(data);
					this.handleData(data as DataTransfer);
				});
			});
		});
	}

	sendData(data: DataTransfer) {
		this.connection!.send(data);
	}
}
