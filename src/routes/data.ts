import type { Entity, Song } from '$lib/entity';
import type { Position } from '$lib/visual';

export const demoEntities: Entity[] = [
	{
		type: 'album',
		id: 33931,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/09/01/16/090116af-770e-23da-21a9-6bd30782eda5/00843930013562.rgb.jpg/100x100bb.jpg',
		artist: 'Taylor Swift',
		name: '1989',
		songs: [27271, 7934, 10621, 50778, 53148, 27554, 51830, 56758, 13412, 58315, 64300, 9405, 27443]
	},
	{
		type: 'album',
		id: 29764,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/63/a2/c9/63a2c91a-0d7f-634d-b672-a38493b9e0ed/886445635935.jpg/100x100bb.jpg',
		artist: 'Pink Floyd',
		name: 'A Momentary Lapse of Reason',
		songs: [8535, 17136, 46663, 9551, 62355, 58879, 39034, 19461, 35732, 31196, 53794]
	},
	{
		type: 'album',
		id: 32981,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b7/f2/5d/b7f25d91-4320-47c8-146a-6f84d5bc7e78/cover.jpg/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'A Moon Shaped Pool',
		songs: [6645, 24280, 20832, 37937, 62953, 11397, 60849, 40641, 36198, 6065, 2549]
	},
	{
		type: 'album',
		id: 48173,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/a9/04/e3/a904e322-42b9-17ea-2087-eca27381bcf3/825646095971.jpg/100x100bb.jpg',
		artist: 'Muse',
		name: 'Absolution',
		songs: [
			6540, 49994, 33209, 8572, 23344, 60244, 58529, 59381, 56573, 836, 54729, 25820, 24394, 54723,
			52533
		]
	},
	{
		type: 'single',
		id: 4397,
		songId: 54183,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/31/66/91/31669188-5c29-ad3e-09be-49a40343e5c1/75679993533_1.jpg/100x100bb.jpg',
		artist: 'Estelle',
		name: 'American Boy (feat. Kanye West)'
	},
	{
		type: 'album',
		id: 36303,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/f8/45/5a/f8455a71-8307-aa9a-9c95-3d22efe0804f/886446326146.jpg/100x100bb.jpg',
		artist: 'Khalid',
		name: 'American Teen',
		songs: [
			31405, 34713, 6184, 519, 29926, 18862, 21841, 56202, 22124, 17295, 16226, 60204, 56182, 18652,
			54484
		]
	},
	{
		type: 'album',
		id: 61949,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/5e/7d/fe/5e7dfe2f-75a8-33f6-9472-6db9281b54ec/644110033499.png/100x100bb.jpg',
		artist: 'Alvvays',
		name: 'Antisocialites',
		songs: [38769, 27585, 9281, 13003, 11403, 32855, 50331, 10253, 16603, 19582]
	},
	{
		type: 'album',
		id: 37943,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music123/v4/fd/50/78/fd50787c-78b4-f454-9049-e6eeef92ff84/George_Winston_-_Autumn.jpg/100x100bb.jpg',
		artist: 'George Winston',
		name: 'Autumn',
		songs: [34115, 7779, 6449, 21344, 5429, 15202]
	},
	{
		type: 'album',
		id: 47983,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/73/be/51/73be5115-b424-3075-8591-f0e5be0e3561/190296940323.jpg/100x100bb.jpg',
		artist: 'Joji',
		name: 'BALLADS 1',
		songs: [6680, 51062, 65139, 37198, 48804, 24371, 40391, 61270, 19561, 54859, 30927, 50370]
	},
	{
		type: 'single',
		id: 17815,
		songId: 47648,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/ec/39/7e/ec397ef0-e501-4a19-d758-39ef876e276a/4050538668292.jpg/100x100bb.jpg',
		artist: 'AJR',
		name: 'Bang!'
	},
	{
		type: 'album',
		id: 62346,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/4a/c1/5d/4ac15dc9-2ae6-1d5b-3add-43bae227f941/825646095452.jpg/100x100bb.jpg',
		artist: 'Muse',
		name: 'Black Holes and Revelations',
		songs: [33529, 1091, 64600, 60833, 20787, 56318, 28161, 36631, 10844, 28873, 54387, 29282]
	},
	{
		type: 'album',
		id: 63465,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/8b/b7/08/8bb7086b-cdb5-1ffe-926b-e7637bda6a0d/BeachHouse_Bloom_iTunes.jpg/100x100bb.jpg',
		artist: 'Beach House',
		name: 'Bloom',
		songs: [44303, 39264, 48681, 58228, 9917, 43738, 50842, 981, 60914, 52104]
	},
	{
		type: 'album',
		id: 45456,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/f8/2d/fb/f82dfb61-b107-297a-d395-5511ebdd277c/dj.hrcgnvji.jpg/100x100bb.jpg',
		artist: 'twenty one pilots',
		name: 'Blurryface',
		songs: [
			63925, 8319, 8073, 3173, 634, 63361, 28396, 55737, 58926, 41747, 2727, 35867, 55680, 49185
		]
	},
	{
		type: 'album',
		id: 40882,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/0c/e1/d6/0ce1d612-34eb-07bd-58a1-3ed6d4c9e097/mzi.jtsjyyvb.jpg/100x100bb.jpg',
		artist: 'MGMT',
		name: 'Congratulations',
		songs: [24369, 52539, 13571, 59421, 24271, 50614, 34609, 1145, 25760]
	},
	{
		type: 'album',
		id: 42405,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/a8/2e/b4/a82eb490-f30a-a321-461a-0383c88fec95/15UMGIM23316.rgb.jpg/100x100bb.jpg',
		artist: 'Tame Impala',
		name: 'Currents',
		songs: [13193, 56460, 35318, 10170, 38485, 7209, 18514, 2021, 61788, 52357, 47318, 18203, 62807]
	},
	{
		type: 'album',
		id: 8745,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/1c/0f/81/1c0f818a-e458-dd84-6f1b-ccbdf5fe14d6/825646291045.jpg/100x100bb.jpg',
		artist: 'Gorillaz',
		name: 'Demon Days',
		songs: [
			36324, 58656, 44278, 21982, 25389, 64065, 61182, 52132, 2320, 27739, 32653, 30416, 19424,
			15021, 51852
		]
	},
	{
		type: 'album',
		id: 39849,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/100x100bb.jpg',
		artist: 'Billie Eilish',
		name: 'dont smile at me',
		songs: [55219, 33097, 6148, 43420, 23295, 43526, 33058, 46369, 13801]
	},
	{
		type: 'album',
		id: 23054,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music60/v4/7d/47/e3/7d47e38d-b34c-34ce-e1b3-94cc07f803ff/060270129924.jpg/100x100bb.jpg',
		artist: 'Mother Mother',
		name: 'Eureka',
		songs: [
			52650, 10430, 56048, 16517, 40669, 8747, 13407, 13667, 12073, 3810, 50121, 20880, 11479, 20223
		]
	},
	{
		type: 'album',
		id: 1735,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c5/6c/b1/c56cb16a-52c3-33b5-5189-6c65028001fb/19UM1IM00404.rgb.jpg/100x100bb.jpg',
		artist: 'Billie Eilish',
		name: 'everything i wanted - Single',
		songs: [45835]
	},
	{
		type: 'album',
		id: 58216,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/c4/6c/a0/c46ca052-312a-dc05-bc77-a422e90907a4/859717270721_cover.jpg/100x100bb.jpg',
		artist: 'Tally Hall',
		name: 'Good & Evil',
		songs: [
			42449, 40409, 63247, 25763, 29302, 8409, 34384, 9030, 4718, 58446, 33233, 57178, 48685, 17697
		]
	},
	{
		type: 'album',
		id: 1811,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/1f/c6/be/1fc6bee5-4e07-20ad-9904-0dcf22acdad1/634904078560.png/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'Hail to the Thief',
		songs: [
			57204, 5543, 12649, 5321, 42411, 17209, 3003, 46523, 56896, 61290, 22368, 5893, 59625, 14894
		]
	},
	{
		type: 'album',
		id: 46443,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/2d/f3/c9/2df3c9fd-e0eb-257c-c035-b04f05a66580/21UMGIM36691.rgb.jpg/100x100bb.jpg',
		artist: 'Billie Eilish',
		name: 'Happier Than Ever',
		songs: [
			54699, 38501, 22037, 65398, 21719, 1775, 20814, 60446, 6760, 53691, 50336, 21505, 62430,
			34030, 19757, 865
		]
	},
	{
		id: 3850,
		type: 'album',
		name: 'Heavy Vegetable - Frisbie',
		artist: 'farval',
		artworkUrl: 'https://i.ytimg.com/vi/-BFQiStRDiQ/default.jpg',
		songs: [
			61147, 54958, 1279, 57472, 64225, 50541, 34881, 1861, 15680, 169, 55025, 47349, 11678, 21719,
			19859, 3421, 47892, 37011, 8728, 53059, 28897, 18039, 26573, 53408, 45254, 28237, 15986, 62787
		]
	},
	{
		type: 'album',
		id: 61766,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/d9/ad/52/d9ad5224-6dc5-a7bd-4731-c6010e790604/mzi.ajxmulvp.jpg/100x100bb.jpg',
		artist: 'The Apples In Stereo',
		name: 'Her Wallpaper Reverie',
		songs: [
			30267, 46115, 30425, 23067, 12450, 52716, 6120, 1188, 58714, 58234, 49278, 52170, 1933, 53982,
			106
		]
	},
	{
		type: 'album',
		id: 54113,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/f8/db/68/f8db68a6-9190-baf5-39ab-2bec4254d23c/mzi.cyaqexhp.jpg/100x100bb.jpg',
		artist: 'Roar',
		name: "I Can't Handle Change - EP",
		songs: [58637, 42543, 39972, 20641, 28356, 54176]
	},
	{
		type: 'album',
		id: 55966,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/96/43/93/96439353-97c1-7d58-5f3d-77afc78eb234/617308002805.jpg/100x100bb.jpg',
		artist: 'Crumb',
		name: 'Ice Melt',
		songs: [7227, 52383, 30828, 60210, 55546, 18538, 55246, 13189, 38088, 10919]
	},
	{
		type: 'album',
		id: 25477,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/8c/77/14/8c771429-61c0-af72-418d-c60c376daa83/634904032463.png/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'In Rainbows',
		songs: [52546, 47227, 14214, 901, 17996, 50909, 14195, 26581, 32979, 41452]
	},
	{
		type: 'album',
		id: 44504,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ff/4d/e9/ff4de967-5745-d2e8-5161-f7181d4d9bac/s05.acdiexfy.jpg/100x100bb.jpg',
		artist: 'Neutral Milk Hotel',
		name: 'In the Aeroplane Over the Sea',
		songs: [59984, 63366, 41898, 39329, 54013, 50019, 54551, 38083, 31865, 30848, 9781]
	},
	{
		type: 'album',
		id: 58207,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Features115/v4/ea/04/d4/ea04d45d-6f5d-ede6-fb64-71f3e6a6e62f/dj.ojkzzidd.jpg/100x100bb.jpg',
		artist: 'The Strokes',
		name: 'Is This It',
		songs: [63582, 16776, 63653, 12574, 60053, 5970, 45889, 52913, 32925, 35679, 52150]
	},
	{
		type: 'album',
		id: 60461,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/83/13/f1/8313f143-ba0e-ee4c-eb85-5c259b1ec5e3/656605343648.jpg/100x100bb.jpg',
		artist: 'Crumb',
		name: 'Jinx',
		songs: [54838, 45463, 38301, 15623, 113, 3820, 6929, 45934, 11810, 7601]
	},
	{
		type: 'album',
		id: 16966,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/8e/13/bd8e1358-b367-a689-cb84-cebd0b067dc4/634904078263.png/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'Kid A',
		songs: [43368, 45174, 56961, 61975, 22252, 46073, 47919, 65514, 2709, 60948, 37030]
	},
	{
		type: 'single',
		id: 51915,
		songId: 12006,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/39/91/4f/39914f60-e9aa-4ae9-3962-44b0a5e5d570/656605150062.jpg/100x100bb.jpg',
		artist: 'Phoebe Bridgers',
		name: 'Kyoto'
	},
	{
		type: 'album',
		id: 19432,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/fe/01/99/fe019995-88e4-9e5c-9621-d28953dc9aa5/27273.jpg/100x100bb.jpg',
		artist: 'Mitski',
		name: 'Laurel Hell',
		songs: [54221, 40966, 26548, 59399, 37955, 55775, 47716, 62493, 19431, 40675, 8926]
	},
	{
		type: 'album',
		id: 25338,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5e/12/58/5e1258b2-fa55-279f-5116-a0c897491f51/886446696393.jpg/100x100bb.jpg',
		artist: 'MGMT',
		name: 'Little Dark Age',
		songs: [50398, 58218, 5949, 60383, 43452, 39397, 11167, 17799, 11767, 51236]
	},
	{
		type: 'album',
		id: 33760,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/a0/b1/28/a0b128b5-4340-4f10-da1a-4d32f434557e/cover.jpg/100x100bb.jpg',
		artist: 'Crumb',
		name: 'Locket - EP',
		songs: [11360, 61112, 7178, 18214]
	},
	{
		type: 'album',
		id: 54699,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3b/4b/45/3b4b459a-84ed-f03b-0f3c-85fd145a5108/mzi.oewhanoe.jpg/100x100bb.jpg',
		artist: 'my bloody valentine',
		name: 'Loveless',
		songs: [26243, 53567, 27542, 15702, 24165, 7709, 24161, 65070, 14539, 22850, 47636]
	},
	{
		type: 'album',
		id: 36087,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/100x100bb.jpg',
		artist: 'Taylor Swift',
		name: 'Lover',
		songs: [
			38304, 30510, 58197, 2042, 37094, 15032, 15437, 55791, 3439, 63467, 18105, 55129, 46403, 9056,
			42484, 27633, 2693, 40385
		]
	},
	{
		type: 'album',
		id: 52419,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/e3/f0/b8/e3f0b8b0-88c4-58df-a148-d4714d4fe7dc/744861117957.png/100x100bb.jpg',
		artist: 'Snail Mail',
		name: 'Lush',
		songs: [47152, 43049, 36885, 38427, 58713, 58410, 51796, 37165, 29601, 62938]
	},
	{
		id: 31273,
		type: 'album',
		name: 'Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		artworkUrl: 'https://i.ytimg.com/vi/E2U5GoX4dew/default.jpg',
		songs: [
			59409, 56349, 7683, 1585, 62580, 31218, 23222, 30785, 51250, 46745, 7488, 26813, 30209, 1802,
			53659, 53506, 63954, 20186, 18254, 33443, 60123, 8017, 61836, 30343, 37382, 10793, 35519,
			34827, 40246, 51639, 5667, 35436, 34505, 56590, 22834, 51977, 57032, 16511, 55826, 25044,
			44892, 26566, 48494, 12893, 41432, 2040, 60499, 20127, 16126, 17509
		]
	},
	{
		type: 'album',
		id: 62369,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/fc/f5/3b/fcf53b27-ea5c-dea9-d03e-0e68e7b0448b/dj.dfvzdqgw.jpg/100x100bb.jpg',
		artist: 'Animal Collective',
		name: 'Merriweather Post Pavilion',
		songs: [42514, 6068, 25145, 5618, 47850, 14900, 64102, 60549, 44007, 2132, 35235]
	},
	{
		type: 'album',
		id: 23358,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music126/v4/f1/68/8a/f1688a15-b17a-6939-299c-e79f19b8e1c1/886449882168.jpg/100x100bb.jpg',
		artist: 'George Winston',
		name: 'Night',
		songs: [16328, 35576, 33659, 61143, 61289, 54276, 21991, 48898, 6342, 40724, 22648, 24314]
	},
	{
		type: 'album',
		id: 13345,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/17/0e/f9/170ef9de-00ac-21c6-d8de-d4ecb7755f21/060270082120.jpg/100x100bb.jpg',
		artist: 'Mother Mother',
		name: 'O My Heart',
		songs: [8457, 57921, 59128, 24745, 11035, 7555, 32361, 40404, 64078, 56200, 23220, 526]
	},
	{
		type: 'album',
		id: 14557,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/17/20/5a/17205a92-bbb0-f9e0-d92c-25dc6e366970/09UMGIM45128.rgb.jpg/100x100bb.jpg',
		artist: 'Owl City',
		name: 'Ocean Eyes (Deluxe Version)',
		songs: [
			43069, 45930, 38125, 53585, 17938, 33282, 29519, 40535, 39762, 24625, 12570, 21750, 31420,
			44860, 59536, 2990, 46076, 55616, 24397, 48959
		]
	},
	{
		type: 'album',
		id: 4493,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music/y2005/m05/d25/h10/s05.uwlzforq.jpg/100x100bb.jpg',
		artist: 'Dream Theater',
		name: 'Octavarium',
		songs: [27284, 63793, 34622, 45846, 25581, 28062, 11370, 38236]
	},
	{
		type: 'album',
		id: 14351,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/60/e9/63/60e9632c-0757-58c2-88f8-afaa1f210843/634904078164.png/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'OK Computer',
		songs: [57776, 3617, 18351, 51142, 9989, 56993, 20241, 50441, 47759, 51179, 41921, 40010]
	},
	{
		type: 'album',
		id: 31375,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/3b/26/70/3b2670c7-ae41-3a41-d2a1-c7eedb76c06f/dj.bmwiuprh.jpg/100x100bb.jpg',
		artist: 'MGMT',
		name: 'Oracular Spectacular',
		songs: [4838, 26999, 16454, 42615, 20610, 11615, 29975, 14575, 54122, 34048]
	},
	{
		type: 'album',
		id: 4692,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music71/v4/23/88/bb/2388bbfd-571e-e564-a84d-a63ed807a895/mzm.iigloyep.png/100x100bb.jpg',
		artist: 'Animal Collective',
		name: 'Painting With',
		songs: [47061, 58496, 17710, 50305, 59320, 1236, 44297, 24877, 40390, 44211, 25508, 30904]
	},
	{
		type: 'album',
		id: 31254,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/33/fd/32/33fd32b1-0e43-9b4a-8ed6-19643f23544e/21UMGIM26092.rgb.jpg/100x100bb.jpg',
		artist: 'Olivia Rodrigo',
		name: 'SOUR',
		songs: [3925, 25292, 881, 6104, 63159, 28464, 34833, 29868, 29106, 7444, 60735]
	},
	{
		type: 'album',
		id: 46265,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/93/a1/64/93a16459-94dc-811e-22b9-7008b3d10a98/859716702001_cover.jpg/100x100bb.jpg',
		artist: 'Lemon Demon',
		name: 'Spirit Phone',
		songs: [
			30320, 49990, 57972, 22738, 43145, 50564, 16265, 27885, 42912, 43272, 7564, 33939, 28966,
			60786, 41256, 57570, 54687, 44794, 47233, 62254, 48416, 29990, 23393, 56977, 28398, 21149,
			4728
		]
	},
	{
		type: 'album',
		id: 7666,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/e2/61/f8/e261f8c1-73db-9a7a-c89e-1068f19970e0/16UMGIM67863.rgb.jpg/100x100bb.jpg',
		artist: 'The Weeknd',
		name: 'Starboy',
		songs: [
			40214, 8554, 38847, 43932, 2935, 35450, 18972, 17533, 62777, 23247, 64815, 10995, 9290, 30620,
			52724, 12797, 8207, 58193
		]
	},
	{
		id: 50157,
		type: 'album',
		name: 'Super Mario Odyssey - Soundtrack',
		artist: 'Video Games Music',
		artworkUrl: 'https://i.ytimg.com/vi/5tzK1AdloeQ/default.jpg',
		songs: [
			42261, 19625, 63151, 45609, 6971, 22901, 39340, 56810, 46035, 62310, 35236, 54330, 10799, 111,
			55936, 37910, 39310, 35172, 25764, 57304, 44204, 64141, 21438, 3758, 40, 16030, 1379, 19562,
			52168, 44346, 35671, 61971, 41177, 5057, 45772, 1574, 8228, 2603, 9572, 36805, 40003, 27624,
			55393, 39166, 46026, 11280, 47961, 26986, 8184, 30596
		]
	},
	{
		type: 'album',
		id: 31346,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/a5/c6/9b/a5c69b1d-22ba-a7e3-e1c2-970c6b53c8eb/634904078065.png/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'The Bends',
		songs: [39563, 16365, 27345, 33445, 5172, 65224, 29342, 48598, 27922, 1463, 18852, 52952]
	},
	{
		type: 'album',
		id: 61240,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/7e/ac/69/7eac6998-7fa4-f1ab-9601-e8b791c736fa/mzi.fbpszunc.jpg/100x100bb.jpg',
		artist: 'My Chemical Romance',
		name: 'The Black Parade',
		songs: [
			18555, 5135, 42747, 18666, 48817, 11006, 58171, 57166, 39145, 47500, 64782, 31638, 42283,
			31338
		]
	},
	{
		type: 'album',
		id: 26708,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c6/49/fc/c649fc21-4c65-d55d-71a4-dac0c39e7a56/886445627572.jpg/100x100bb.jpg',
		artist: 'Pink Floyd',
		name: 'The Division Bell',
		songs: [24956, 50139, 62127, 44438, 53016, 18841, 34578, 22968, 3613, 46577, 10609]
	},
	{
		type: 'album',
		id: 22132,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d2/a4/76/d2a476d8-7bbe-fb97-0123-aff82715b517/634904078768.png/100x100bb.jpg',
		artist: 'Radiohead',
		name: 'The King of Limbs',
		songs: [64009, 57859, 387, 60197, 53739, 37879, 48056, 53941]
	},
	{
		type: 'album',
		id: 65322,
		artworkUrl:
			'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/1a/e8/70/1ae870c3-b402-096b-c4c4-8022af5a2ed9/745099189662.jpg/100x100bb.jpg',
		artist: 'The Smiths',
		name: 'The Queen Is Dead',
		songs: [53688, 33447, 64216, 49946, 23378, 51829, 57740, 51805, 339, 37294]
	},
	{
		type: 'album',
		id: 59519,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/53/13/26/531326a2-b93d-9ab8-30cc-e4a9392e7b86/825646092666.jpg/100x100bb.jpg',
		artist: 'Muse',
		name: 'The Resistance',
		songs: [7265, 34280, 57196, 63216, 4410, 33032, 21468, 63074, 30442, 25561, 64747]
	},
	{
		type: 'single',
		id: 52040,
		songId: 5826,
		artworkUrl:
			'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ea/9f/1a/ea9f1ab0-4cac-c925-590d-14461f676912/886446576510.jpg/100x100bb.jpg',
		artist: 'Arcade Fire',
		name: 'The Suburbs'
	},
	{
		type: 'album',
		id: 5222,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/3c/b4/e3/3cb4e3d0-cd77-8f18-7465-d60e6949b435/886445635850.jpg/100x100bb.jpg',
		artist: 'Pink Floyd',
		name: 'The Wall',
		songs: [
			55798, 2936, 40827, 42081, 13179, 22318, 34815, 34993, 56297, 14049, 37048, 64842, 20529,
			20615, 21103, 25191, 31984, 40572, 58606, 2170, 3807, 58779, 4798, 31782, 12389, 42347
		]
	},
	{
		type: 'album',
		id: 39124,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/21/de/99/21de99a3-6eb6-5372-6a96-40d992808d9c/075679716224.jpg/100x100bb.jpg',
		artist: 'Paramore',
		name: 'This Is Why',
		songs: [56940, 38700, 8925, 3649, 60818, 37687, 24065, 17296, 55575, 30414]
	},
	{
		type: 'album',
		id: 10166,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/54/f6/fc/54f6fc73-6a18-d97a-a634-a4630ec35593/WeyesBlood_TitanicRising_3600.jpg/100x100bb.jpg',
		artist: 'Weyes Blood',
		name: 'Titanic Rising',
		songs: [13649, 46007, 29193, 4416, 37065, 56891, 7624, 63528, 44464, 24314]
	},
	{
		type: 'album',
		id: 28577,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/f3/ac/06/f3ac06b3-9217-adc8-cc33-8e930293e495/887835044184.png/100x100bb.jpg',
		artist: 'Arctic Monkeys',
		name: 'Tranquility Base Hotel & Casino',
		songs: [33783, 28921, 59526, 27061, 13258, 30307, 6025, 53988, 26897, 24875, 27754]
	},
	{
		type: 'album',
		id: 35124,
		artworkUrl:
			'https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/3c/cb/3a/3ccb3ab8-7642-c3ad-f6eb-e81a735a7503/067003248969.png/100x100bb.jpg',
		artist: 'Boa',
		name: 'Twilight',
		songs: [
			58449, 2589, 24824, 32733, 30347, 40035, 24508, 37553, 6549, 43502, 31108, 61037, 57870, 51269
		]
	},
	{
		type: 'album',
		id: 55152,
		artworkUrl:
			'https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/28/28/fb/2828fbf7-a207-ce51-8405-a1077fb50782/786851250428_cover.jpg/100x100bb.jpg',
		artist: 'Lemon Demon',
		name: 'View-monster',
		songs: [
			20498, 38112, 1777, 46869, 52255, 40751, 12714, 11986, 22332, 63450, 32802, 15310, 22683,
			14620, 19122, 7448, 61192, 40565, 59266, 15769, 5490, 33953, 6130
		]
	},
	{
		type: 'album',
		id: 21687,
		artworkUrl:
			'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/100x100bb.jpg',
		artist: 'Billie Eilish',
		name: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
		songs: [
			24015, 5868, 24424, 32725, 27969, 6316, 39758, 42154, 10108, 10100, 63870, 65378, 38781, 34567
		]
	},
	{
		id: 9029,
		type: 'album',
		name: 'Super Mario 3D World - Soundtrack',
		artist: 'Video Games Music',
		artworkUrl: 'https://i.ytimg.com/vi/GC7W9PJkBTg/default.jpg',
		songs: [
			35214, 26391, 2150, 5530, 22353, 47709, 12078, 64059, 12236, 51170, 55883, 15076, 57004,
			57482, 64589, 19449, 30839, 49206, 37666, 8291, 49763, 56610, 26916, 2298, 42472, 35474,
			24566, 64393, 54608, 49587, 63939, 62467, 58393, 20025, 4104, 8130, 10232, 4623, 54164, 34184,
			3300, 18081, 46442, 9996, 26100, 19173, 13385, 63706, 22613, 57879
		]
	}
];

export const demoSongs: Song[] = [
	{ id: 0, artist: 'test artist', name: 'test song', youtubeId: 'DDJ-SUZrtW0' },
	{ id: 1, artist: 'test artist 1', name: 'test song 1', youtubeId: 'YzKM5g_FwYU' },
	{ id: 2, artist: 'test artist', name: 'test song TWO', youtubeId: 'DDJ-SUZrtW0' },
	{ id: 13193, name: 'Let It Happen', artist: 'Tame Impala', youtubeId: 'pFptt7Cargc' },
	{ id: 56460, name: 'Nangs', artist: 'Tame Impala', youtubeId: 'c3yEjD_oijw' },
	{ id: 35318, name: 'The Moment', artist: 'Tame Impala', youtubeId: '3Qpf9pAkUeI' },
	{ id: 10170, name: "Yes I'm Changing", artist: 'Tame Impala', youtubeId: 'D_cMCvudZBs' },
	{ id: 38485, name: 'Eventually', artist: 'Tame Impala', youtubeId: 'GHe8kKO8uds' },
	{ id: 7209, name: 'Gossip', artist: 'Tame Impala', youtubeId: 'NF0_IUZIUxs' },
	{
		id: 18514,
		name: 'The Less I Know the Better',
		artist: 'Tame Impala',
		youtubeId: 'sBzrzS1Ag_g'
	},
	{ id: 2021, name: 'Past Life', artist: 'Tame Impala', youtubeId: '4kZ2W5f-H3k' },
	{ id: 61788, name: 'Disciples', artist: 'Tame Impala', youtubeId: 'NTfYYRGTB3g' },
	{ id: 52357, name: "'Cause I'm a Man", artist: 'Tame Impala', youtubeId: 'hefh9dFnChY' },
	{ id: 47318, name: 'Reality In Motion', artist: 'Tame Impala', youtubeId: 'hQN3RH_xWJg' },
	{ id: 18203, name: 'Love/Paranoia', artist: 'Tame Impala', youtubeId: 'eI2c-Nrgsko' },
	{
		id: 62807,
		name: 'New Person, Same Old Mistakes',
		artist: 'Tame Impala',
		youtubeId: '_9bw_VtMUGA'
	},
	{ id: 6645, name: 'Burn the Witch', artist: 'Radiohead', youtubeId: 'qIm0fsMo0Rg' },
	{ id: 24280, name: 'Daydreaming', artist: 'Radiohead', youtubeId: 'TTAU7lLDZYU' },
	{ id: 20832, name: 'Decks Dark', artist: 'Radiohead', youtubeId: 'Del3C2W63Pk' },
	{ id: 37937, name: 'Desert Island Disk', artist: 'Radiohead', youtubeId: 'RfmE73FCOFg' },
	{ id: 62953, name: 'Ful Stop', artist: 'Radiohead', youtubeId: 'NHDOk7lA53w' },
	{ id: 11397, name: 'Glass Eyes', artist: 'Radiohead', youtubeId: 'fzK5kbNL2Ak' },
	{ id: 60849, name: 'Identikit', artist: 'Radiohead', youtubeId: 'QZfK4zOQQ3E' },
	{ id: 40641, name: 'The Numbers', artist: 'Radiohead', youtubeId: 'zmo-11Bc0XM' },
	{ id: 36198, name: 'Present Tense', artist: 'Radiohead', youtubeId: 'kPAZV8y4B44' },
	{
		id: 6065,
		name: 'Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief',
		artist: 'Radiohead',
		youtubeId: 'hetqKun4XFg'
	},
	{ id: 2549, name: 'True Love Waits', artist: 'Radiohead', youtubeId: 'WSnc_6Z7HqQ' },
	{ id: 38769, name: 'In Undertow', artist: 'Alvvays', youtubeId: 'T1n72aCdwdU' },
	{ id: 27585, name: 'Dreams Tonite', artist: 'Alvvays', youtubeId: 'ZXu6q-6JKjA' },
	{ id: 9281, name: 'Plimsoll Punks', artist: 'Alvvays', youtubeId: 'VXZx19uN4MQ' },
	{ id: 13003, name: 'Your Type', artist: 'Alvvays', youtubeId: '0HDSlfRv6ZY' },
	{ id: 11403, name: 'Not My Baby', artist: 'Alvvays', youtubeId: 'ecrCsEMdnQM' },
	{ id: 32855, name: 'Hey', artist: 'Alvvays', youtubeId: 'kKMMc_8xaXI' },
	{ id: 50331, name: 'Lollipop (Ode to Jim)', artist: 'Alvvays', youtubeId: 'mH9ffXJmrY4' },
	{ id: 10253, name: 'Already Gone', artist: 'Alvvays', youtubeId: 'sLbVJgyOMUM' },
	{ id: 16603, name: 'Saved by a Waif', artist: 'Alvvays', youtubeId: 'rRMqUQJ0Y9E' },
	{ id: 19582, name: 'Forget About Life', artist: 'Alvvays', youtubeId: 'qMk5phllgmU' },
	{ id: 6540, name: 'Intro', artist: 'Muse', youtubeId: 'aZ63ddPnbFw' },
	{ id: 49994, name: 'Apocalypse Please', artist: 'Muse', youtubeId: 'MCr36u4i_7E' },
	{ id: 33209, name: 'Time Is Running Out', artist: 'Muse', youtubeId: 'BfRBYmRrhYg' },
	{ id: 8572, name: 'Sing for Absolution', artist: 'Muse', youtubeId: 'xDOwjPWCU3g' },
	{ id: 23344, name: 'Stockholm Syndrome', artist: 'Muse', youtubeId: '61Q0moGbeEo' },
	{ id: 60244, name: 'Falling Away with You', artist: 'Muse', youtubeId: 'ZIFhbzMEz2c' },
	{ id: 58529, name: 'Interlude', artist: 'Muse', youtubeId: 'D7oEceXen4I' },
	{ id: 59381, name: 'Hysteria', artist: 'Muse', youtubeId: '3dm_5qWWDV8' },
	{ id: 56573, name: 'Blackout', artist: 'Muse', youtubeId: 'wBhnaOp34d8' },
	{ id: 836, name: 'Butterflies and Hurricanes', artist: 'Muse', youtubeId: 'wIZ-iYNRHWE' },
	{ id: 54729, name: 'The Small Print', artist: 'Muse', youtubeId: 'K3JPO-K-vrY' },
	{ id: 25820, name: 'Endlessly', artist: 'Muse', youtubeId: 'yZLPo6XgsIM' },
	{ id: 24394, name: 'Thoughts of a Dying Atheist', artist: 'Muse', youtubeId: 'tQcjpJHr5BI' },
	{ id: 54723, name: 'Ruled By Secrecy', artist: 'Muse', youtubeId: 'dKiayHSR4DI' },
	{ id: 52533, name: 'Fury (Bonus Track)', artist: 'Muse', youtubeId: '1n5a9vk1wig' },
	{ id: 44303, name: 'Myth', artist: 'Beach House', youtubeId: 'hX7RYQq4g5Q' },
	{ id: 39264, name: 'Wild', artist: 'Beach House', youtubeId: 'qN4sIlaX6Sk' },
	{ id: 48681, name: 'Lazuli', artist: 'Beach House', youtubeId: 'BfzFVbkutFE' },
	{ id: 58228, name: 'Other People', artist: 'Beach House', youtubeId: '2XkB_QZg1Kw' },
	{ id: 9917, name: 'The Hours', artist: 'Beach House', youtubeId: 'TDKUBSxdqy4' },
	{ id: 43738, name: 'Troublemaker', artist: 'Beach House', youtubeId: '7WsCUfYZbRE' },
	{ id: 50842, name: 'New Year', artist: 'Beach House', youtubeId: 'C_WNiHy6xaI' },
	{ id: 981, name: 'Wishes', artist: 'Beach House', youtubeId: 'sb7797FQG5Y' },
	{ id: 60914, name: 'On the Sea', artist: 'Beach House', youtubeId: '0qz0IJXQ720' },
	{ id: 52104, name: 'Irene', artist: 'Beach House', youtubeId: '7kqC03gXSwk' },
	{ id: 24369, name: "It's Working", artist: 'MGMT', youtubeId: 'JyaDTiXH3R4' },
	{ id: 52539, name: 'Song for Dan Treacy', artist: 'MGMT', youtubeId: 'qICsQ8lT4Ko' },
	{ id: 13571, name: "Someone's Missing", artist: 'MGMT', youtubeId: 'udnt8YX0jlQ' },
	{ id: 59421, name: 'Flash Delirium', artist: 'MGMT', youtubeId: 'QvSMp7T2Kes' },
	{ id: 24271, name: 'I Found a Whistle', artist: 'MGMT', youtubeId: '5QE2J1yRhmA' },
	{ id: 50614, name: 'Siberian Breaks', artist: 'MGMT', youtubeId: 'Cfg4SYjc9cg' },
	{ id: 34609, name: 'Brian Eno', artist: 'MGMT', youtubeId: '_f_jaqLLPTU' },
	{ id: 1145, name: "Lady Dada's Nightmare", artist: 'MGMT', youtubeId: 'm-C4zBR6EBE' },
	{ id: 25760, name: 'Congratulations', artist: 'MGMT', youtubeId: 'ZFLtTOfLfwY' },
	{ id: 63925, name: 'Heavydirtysoul', artist: 'twenty one pilots', youtubeId: 'r_9Kf0D5BTs' },
	{ id: 8319, name: 'Stressed Out', artist: 'twenty one pilots', youtubeId: 'pXRviuL6vMY' },
	{ id: 8073, name: 'Ride', artist: 'twenty one pilots', youtubeId: 'Pw-0pbY9JeU' },
	{ id: 3173, name: 'Fairly Local', artist: 'twenty one pilots', youtubeId: 'HDI9inno86U' },
	{ id: 634, name: 'Tear In My Heart', artist: 'twenty one pilots', youtubeId: 'nky4me4NP70' },
	{ id: 63361, name: 'Lane Boy', artist: 'twenty one pilots', youtubeId: 'ywvRgGAd2XI' },
	{ id: 28396, name: 'The Judge', artist: 'twenty one pilots', youtubeId: 'PbP-aIe51Ek' },
	{ id: 55737, name: 'Doubt', artist: 'twenty one pilots', youtubeId: 'MEiVnNNpJLA' },
	{ id: 58926, name: 'Polarize', artist: 'twenty one pilots', youtubeId: 'MiPBQJq49xk' },
	{
		id: 41747,
		name: "We Don't Believe What's On TV",
		artist: 'twenty one pilots',
		youtubeId: 'zZEumf7RowI'
	},
	{ id: 2727, name: 'Message Man', artist: 'twenty one pilots', youtubeId: 'iE_54CU7Fxk' },
	{ id: 35867, name: 'Hometown', artist: 'twenty one pilots', youtubeId: 'pJtlLzsDICo' },
	{ id: 55680, name: 'Not Today', artist: 'twenty one pilots', youtubeId: 'yqem6k_3pZ8' },
	{ id: 49185, name: 'Goner', artist: 'twenty one pilots', youtubeId: '3J5mE-J1WLk' },
	{ id: 52650, name: 'Chasing It Down', artist: 'Mother Mother', youtubeId: '6VezN64i_DE' },
	{ id: 10430, name: 'The Stand', artist: 'Mother Mother', youtubeId: 'lSCks1NAFTM' },
	{ id: 56048, name: "Baby Don't Dance", artist: 'Mother Mother', youtubeId: 'HTLe7jWKK50' },
	{ id: 16517, name: 'Original Spin', artist: 'Mother Mother', youtubeId: 'QORkt-yOdZM' },
	{ id: 40669, name: 'Born In a Flash', artist: 'Mother Mother', youtubeId: 'WaOQkK_pt0w' },
	{ id: 8747, name: 'Simply Simple', artist: 'Mother Mother', youtubeId: 'Salh9gSZjt4' },
	{ id: 13407, name: 'Problems', artist: 'Mother Mother', youtubeId: 'fZ55xoOYDNY' },
	{ id: 13667, name: 'Aspiring Fires', artist: 'Mother Mother', youtubeId: '8yK8lUW6o3Q' },
	{ id: 12073, name: 'Getaway', artist: 'Mother Mother', youtubeId: '5z57Z-GcM7Y' },
	{ id: 3810, name: 'Far In Time', artist: 'Mother Mother', youtubeId: 'LnysLELRugU' },
	{ id: 50121, name: 'Oleander', artist: 'Mother Mother', youtubeId: 'ppfomLPb3h0' },
	{ id: 20880, name: 'Calm Me Down', artist: 'Mother Mother', youtubeId: '9xo72zx7P3c' },
	{ id: 11479, name: 'In the Wings', artist: 'Mother Mother', youtubeId: 'Xf1kBMhgYXQ' },
	{ id: 20223, name: 'Carve a Name', artist: 'Mother Mother', youtubeId: 'qxQy2tgXL9E' },
	{ id: 36324, name: 'Intro', artist: 'Gorillaz', youtubeId: 'lgzcpK9uWqs' },
	{ id: 58656, name: 'Last Living Souls', artist: 'Gorillaz', youtubeId: '13Rs6aV5i1I' },
	{ id: 44278, name: 'Kids With Guns', artist: 'Gorillaz', youtubeId: 'VCkFSe3voRc' },
	{ id: 21982, name: 'O Green World', artist: 'Gorillaz', youtubeId: 'f01sIr-y6PY' },
	{ id: 25389, name: 'Dirty Harry', artist: 'Gorillaz', youtubeId: 'cLnkQAeMbIM' },
	{ id: 64065, name: 'Feel Good Inc.', artist: 'Gorillaz', youtubeId: 'HyHNuVaZJ-k' },
	{ id: 61182, name: 'El Mañana', artist: 'Gorillaz', youtubeId: 'vJrbeHQxPTA' },
	{
		id: 52132,
		name: 'Every Planet We Reach Is Dead',
		artist: 'Gorillaz',
		youtubeId: 'eevt2glBfMg'
	},
	{ id: 2320, name: 'November Has Come', artist: 'Gorillaz', youtubeId: 'IHqOsme3H_U' },
	{ id: 27739, name: 'All Alone', artist: 'Gorillaz', youtubeId: 'lYXAkiGhGpA' },
	{ id: 32653, name: 'White Light', artist: 'Gorillaz', youtubeId: 'IGdNtAhltUE' },
	{ id: 30416, name: 'Dare', artist: 'Gorillaz', youtubeId: 'uAOR6ib95kQ' },
	{
		id: 19424,
		name: "Fire Coming Out of the Monkey's Head",
		artist: 'Gorillaz',
		youtubeId: 'OBabG0T2fwQ'
	},
	{ id: 15021, name: "Don't Get Lost In Heaven", artist: 'Gorillaz', youtubeId: 'FMn-EdNTuho' },
	{ id: 51852, name: 'Demon Days', artist: 'Gorillaz', youtubeId: 'OO4haiXI8B8' },
	{ id: 42449, name: 'Never Meant to Know', artist: 'Tally Hall', youtubeId: 'IawfoCuBV3c' },
	{ id: 40409, name: '&', artist: 'Tally Hall', youtubeId: 'bBvc0wJRQhs' },
	{ id: 63247, name: 'You & Me', artist: 'Tally Hall', youtubeId: '1RliQKR6jXM' },
	{ id: 25763, name: 'Cannibal', artist: 'Tally Hall', youtubeId: '5_QwMRE-BKc' },
	{ id: 29302, name: 'Who You Are', artist: 'Tally Hall', youtubeId: 'iv_8w5-PTDg' },
	{ id: 8409, name: 'Sacred Beast', artist: 'Tally Hall', youtubeId: '7Q0ge00LmwM' },
	{ id: 34384, name: 'Hymn for a Scarecrow', artist: 'Tally Hall', youtubeId: 'rfUeWe7u364' },
	{ id: 9030, name: 'A Lady', artist: 'Tally Hall', youtubeId: 'rygZkj3W_RM' },
	{ id: 4718, name: 'The Trap', artist: 'Tally Hall', youtubeId: 'OjGzOJ5IiSM' },
	{ id: 58446, name: 'Turn the Lights Off', artist: 'Tally Hall', youtubeId: 'dLrdSC9MVb4' },
	{ id: 33233, name: 'Misery Fell', artist: 'Tally Hall', youtubeId: 'OFi8748c9Ew' },
	{ id: 57178, name: 'Out in the Twilight', artist: 'Tally Hall', youtubeId: 'CgcTf6JYxsE' },
	{ id: 48685, name: 'You', artist: 'Tally Hall', youtubeId: 'HnwemKW9H3s' },
	{ id: 17697, name: 'Fate of the Stars', artist: 'Tally Hall', youtubeId: 'tRnMWzz44gA' },
	{ id: 58637, name: "I Can't Handle Change", artist: 'Roar', youtubeId: 'R7IQ9dpxxJY' },
	{ id: 42543, name: 'Duck Or Ape', artist: 'Roar', youtubeId: '4KQlQNzxrhA' },
	{ id: 39972, name: 'Heart For Brains', artist: 'Roar', youtubeId: 'KExK8YHXypQ' },
	{ id: 20641, name: 'Baby Bride Rag', artist: 'Roar', youtubeId: '6m6NJIzIhTo' },
	{ id: 28356, name: 'Christmas Kids', artist: 'Roar', youtubeId: 'u6m0ymy2oFk' },
	{ id: 54176, name: 'Just a Fan', artist: 'Roar', youtubeId: 'qUIq98OLQD4' },
	{ id: 57204, name: '2 + 2 = 5', artist: 'Radiohead', youtubeId: '2w6kHS_IRrE' },
	{ id: 5543, name: 'Sit Down. Stand Up', artist: 'Radiohead', youtubeId: 'CVf_HGoY-1E' },
	{ id: 12649, name: 'Sail to the Moon', artist: 'Radiohead', youtubeId: 'INvrv9ppxvQ' },
	{ id: 5321, name: 'Backdrifts', artist: 'Radiohead', youtubeId: 'BTjQsshhPtM' },
	{ id: 42411, name: 'Go to Sleep', artist: 'Radiohead', youtubeId: '6qn5SfmkbKE' },
	{ id: 17209, name: 'Where I End and You Begin', artist: 'Radiohead', youtubeId: 'pyTY6Z-Fqzw' },
	{ id: 3003, name: 'We Suck Young Blood', artist: 'Radiohead', youtubeId: 'MkSRfituw3c' },
	{ id: 46523, name: 'The Gloaming', artist: 'Radiohead', youtubeId: 'Qh_iXvllR6E' },
	{ id: 56896, name: 'There, There', artist: 'Radiohead', youtubeId: 'Z2aH-sluR5s' },
	{ id: 61290, name: 'I Will', artist: 'Radiohead', youtubeId: 'zBe6pJ4THnc' },
	{ id: 22368, name: 'A Punch Up at a Wedding', artist: 'Radiohead', youtubeId: '2DWP6a25iJI' },
	{ id: 5893, name: 'Myxomatosis', artist: 'Radiohead', youtubeId: 'PxOO8YkB_Og' },
	{ id: 59625, name: 'Scatterbrain', artist: 'Radiohead', youtubeId: 'r7mN9BLr4jU' },
	{ id: 14894, name: 'A Wolf at the Door', artist: 'Radiohead', youtubeId: '6isz01iv8Ls' },
	{
		id: 30267,
		name: 'I. Her Room Is a Rainy Garden (Wallpaper Reverie Theme)',
		artist: 'The Apples In Stereo',
		youtubeId: 'UIdSq_y0lJM'
	},
	{
		id: 46115,
		name: 'II. Morning Breaks (And Roosters Complain)',
		artist: 'The Apples In Stereo',
		youtubeId: 'DgMh9XyYjwM'
	},
	{ id: 30425, name: 'The Shiney Sea', artist: 'The Apples In Stereo', youtubeId: 'WXNN9yNGu4o' },
	{
		id: 23067,
		name: 'III. the Significance of a Floral Print',
		artist: 'The Apples In Stereo',
		youtubeId: 'EM0J-E1_G2o'
	},
	{ id: 12450, name: 'Strawberryfire', artist: 'The Apples In Stereo', youtubeId: 'VDJwHjWzxA4' },
	{
		id: 52716,
		name: 'IV. from Outside, In Floats a Music Box',
		artist: 'The Apples In Stereo',
		youtubeId: 'eAGD5aQHQjM'
	},
	{ id: 6120, name: 'Ruby', artist: 'The Apples In Stereo', youtubeId: '0bXSHe5aU3s' },
	{
		id: 1188,
		name: 'V. She Looks Through Empty Windows',
		artist: 'The Apples In Stereo',
		youtubeId: '3nN9GC0m52A'
	},
	{
		id: 58714,
		name: 'Questions and Answers',
		artist: 'The Apples In Stereo',
		youtubeId: 'MSTPj5AWmV8'
	},
	{
		id: 58234,
		name: 'Drifting Patterns',
		artist: 'The Apples In Stereo',
		youtubeId: 'U-Y_NQhuFXM'
	},
	{ id: 49278, name: 'Y2K', artist: 'The Apples In Stereo', youtubeId: 'xg8OfHWxqlo' },
	{ id: 52170, name: 'VI. Les Amants', artist: 'The Apples In Stereo', youtubeId: 'Kwgy9I6T0J0' },
	{
		id: 1933,
		name: 'Benefits of Lying (With Your Friend)',
		artist: 'The Apples In Stereo',
		youtubeId: 'gudQDnhGscQ'
	},
	{
		id: 53982,
		name: 'VII. Ruby, Tell Me',
		artist: 'The Apples In Stereo',
		youtubeId: 'Oqnk8gatwcw'
	},
	{
		id: 106,
		name: 'VIII. Together They Dream Into the Evening',
		artist: 'The Apples In Stereo',
		youtubeId: 'e_u-oN1WCIE'
	},
	{ id: 7227, name: 'Up & Down', artist: 'Crumb', youtubeId: 'j98eT-3-dsg' },
	{ id: 52383, name: 'BNR', artist: 'Crumb', youtubeId: 'XL4dcAIWqgA' },
	{ id: 30828, name: 'Seeds', artist: 'Crumb', youtubeId: 'OM0UfRJt3Os' },
	{ id: 60210, name: 'L.A.', artist: 'Crumb', youtubeId: 'Y0cCsllLYVY' },
	{ id: 55546, name: 'Gone', artist: 'Crumb', youtubeId: 'L_m-3Z4d0bU' },
	{ id: 18538, name: 'Retreat!', artist: 'Crumb', youtubeId: 'jsSiqLKvPsI' },
	{ id: 55246, name: 'Trophy', artist: 'Crumb', youtubeId: '_T9uppDEzc8' },
	{ id: 13189, name: 'Balloon', artist: 'Crumb', youtubeId: '3xRxP6A5uUs' },
	{ id: 38088, name: 'Tunnel (all that you had)', artist: 'Crumb', youtubeId: 'vYvpOJsV2_0' },
	{ id: 10919, name: 'Ice Melt', artist: 'Crumb', youtubeId: 'zMaXdYLzsOs' },
	{ id: 54838, name: 'Cracking', artist: 'Crumb', youtubeId: 'BEklFnXxBAA' },
	{ id: 45463, name: 'Nina', artist: 'Crumb', youtubeId: '94jSIcxXI-o' },
	{ id: 38301, name: 'Ghostride', artist: 'Crumb', youtubeId: 'HS4aJ_51qNQ' },
	{ id: 15623, name: 'Fall Down', artist: 'Crumb', youtubeId: 'xACGEOJ3Rxw' },
	{ id: 113, name: 'M.R.', artist: 'Crumb', youtubeId: 'IKLXLzbL1Pw' },
	{ id: 3820, name: 'The Letter', artist: 'Crumb', youtubeId: 'zuCh3RkOzf8' },
	{ id: 6929, name: 'Part III', artist: 'Crumb', youtubeId: 'fPycPICKvPM' },
	{ id: 45934, name: 'And It Never Ends', artist: 'Crumb', youtubeId: 'qIF_NbfopCU' },
	{ id: 11810, name: 'Faces', artist: 'Crumb', youtubeId: 'gkNRDzdKuH0' },
	{ id: 7601, name: 'Jinx', artist: 'Crumb', youtubeId: '_gowb0Ncz24' },
	{
		id: 43368,
		name: 'Everything In Its Right Place',
		artist: 'Radiohead',
		youtubeId: 'NUnXxh5U25Y'
	},
	{ id: 45174, name: 'Kid A', artist: 'Radiohead', youtubeId: 'MXNbfU0Ww_E' },
	{ id: 56961, name: 'The National Anthem', artist: 'Radiohead', youtubeId: 'NfQD1QiQ9o4' },
	{ id: 61975, name: 'How to Disappear Completely', artist: 'Radiohead', youtubeId: '6W6HhdqA95w' },
	{ id: 22252, name: 'Treefingers', artist: 'Radiohead', youtubeId: 'L7p47zYKJoM' },
	{ id: 46073, name: 'Optimistic', artist: 'Radiohead', youtubeId: '1On-ZHfTWOo' },
	{ id: 47919, name: 'In Limbo', artist: 'Radiohead', youtubeId: 'Q29iibXXiOs' },
	{ id: 65514, name: 'Idioteque', artist: 'Radiohead', youtubeId: 'svwJTnZOaco' },
	{ id: 2709, name: 'Morning Bell', artist: 'Radiohead', youtubeId: 'XTT6k3Q4JnQ' },
	{ id: 60948, name: 'Motion Picture Soundtrack', artist: 'Radiohead', youtubeId: 'EcSvMFm2ABE' },
	{ id: 37030, name: 'Untitled', artist: 'Radiohead', youtubeId: 'L_PvBLtvZto' },
	{ id: 63582, name: 'Is This It', artist: 'The Strokes', youtubeId: 'RHrGj1IyE0Y' },
	{ id: 16776, name: 'The Modern Age', artist: 'The Strokes', youtubeId: 'RzO7IGWGxu8' },
	{ id: 63653, name: 'Soma', artist: 'The Strokes', youtubeId: 'EY9nr4Lkfw0' },
	{ id: 12574, name: 'Barely Legal', artist: 'The Strokes', youtubeId: 'buBa8XHd0fo' },
	{ id: 60053, name: 'Someday', artist: 'The Strokes', youtubeId: 'knU9gRUWCno' },
	{ id: 5970, name: 'Alone, Together', artist: 'The Strokes', youtubeId: 'Z_DXTFlj6wM' },
	{ id: 45889, name: 'Last Nite', artist: 'The Strokes', youtubeId: 'TOypSnKFHrE' },
	{ id: 52913, name: 'Hard to Explain', artist: 'The Strokes', youtubeId: 'BXkm6h6uq0k' },
	{ id: 32925, name: 'When It Started', artist: 'The Strokes', youtubeId: '5DheMMCksAI' },
	{ id: 35679, name: 'Trying Your Luck', artist: 'The Strokes', youtubeId: 'KadGvFjqGls' },
	{ id: 52150, name: 'Take It or Leave It', artist: 'The Strokes', youtubeId: 'zThEe7YA8Ko' },
	{ id: 54221, name: 'Valentine, Texas', artist: 'Mitski', youtubeId: 'GOeAaxvidPI' },
	{ id: 40966, name: 'Working for the Knife', artist: 'Mitski', youtubeId: 'HYbXt4_r9Pw' },
	{ id: 26548, name: 'Stay Soft', artist: 'Mitski', youtubeId: 'cNwy1Th4NYo' },
	{ id: 59399, name: 'Everyone', artist: 'Mitski', youtubeId: 'AyXm7ZZRJjM' },
	{ id: 37955, name: 'Heat Lightning', artist: 'Mitski', youtubeId: 'gvIkcN5YMH4' },
	{ id: 55775, name: 'The Only Heartbreaker', artist: 'Mitski', youtubeId: 'LmXFF_whkVk' },
	{ id: 47716, name: 'Love Me More', artist: 'Mitski', youtubeId: 'P4J3Z9xgjWQ' },
	{ id: 62493, name: "There's Nothing Left for You", artist: 'Mitski', youtubeId: 'MFsCyEjTBlU' },
	{ id: 19431, name: "Should've Been Me", artist: 'Mitski', youtubeId: 'Aq-6RNWLDVA' },
	{ id: 40675, name: 'I Guess', artist: 'Mitski', youtubeId: 'So0NYg0I0CI' },
	{ id: 8926, name: "That's Our Lamp", artist: 'Mitski', youtubeId: 'zkgsWurEfoo' },
	{ id: 11360, name: 'Plants', artist: 'Crumb', youtubeId: 'ajyBZVSNCiI' },
	{ id: 61112, name: 'Recently Played', artist: 'Crumb', youtubeId: '77W8byh7144' },
	{ id: 7178, name: 'Thirty-Nine', artist: 'Crumb', youtubeId: 'as6QGJ_gLbk' },
	{ id: 18214, name: 'Locket', artist: 'Crumb', youtubeId: 'xKmqwrQFlpA' },
	{ id: 47152, name: 'Intro', artist: 'Snail Mail', youtubeId: 'vwF6KrECJaw' },
	{ id: 43049, name: 'Pristine', artist: 'Snail Mail', youtubeId: 's7tnTucP1UM' },
	{ id: 36885, name: 'Speaking Terms', artist: 'Snail Mail', youtubeId: 'LV7Iy5ve6p4' },
	{ id: 38427, name: 'Heat Wave', artist: 'Snail Mail', youtubeId: '-d91Qn8QUks' },
	{ id: 58713, name: 'Stick', artist: 'Snail Mail', youtubeId: 'jo_NNdLXans' },
	{ id: 58410, name: "Let's Find an Out", artist: 'Snail Mail', youtubeId: 'uhpFgHhj1H4' },
	{ id: 51796, name: 'Golden Dream', artist: 'Snail Mail', youtubeId: '7gbwDUQ3xmY' },
	{ id: 37165, name: 'Full Control', artist: 'Snail Mail', youtubeId: 'chrzcQnwC2U' },
	{ id: 29601, name: 'Deep Sea', artist: 'Snail Mail', youtubeId: 'vNzIYF4_1AY' },
	{ id: 62938, name: 'Anytime', artist: 'Snail Mail', youtubeId: 'HWzecTzJVBM' },
	{
		id: 38304,
		name: 'I Forgot That You Existed',
		artist: 'Taylor Swift',
		youtubeId: 'p1cEvNn88jM'
	},
	{ id: 30510, name: 'Cruel Summer', artist: 'Taylor Swift', youtubeId: 'ic8j13piAhQ' },
	{ id: 58197, name: 'Lover', artist: 'Taylor Swift', youtubeId: 'uLL2xTK35Qc' },
	{ id: 2042, name: 'The Man', artist: 'Taylor Swift', youtubeId: 'AqAJLh9wuZ0' },
	{ id: 37094, name: 'The Archer', artist: 'Taylor Swift', youtubeId: '8KpKc3C9V3w' },
	{ id: 15032, name: 'I Think He Knows', artist: 'Taylor Swift', youtubeId: '2d1wKn-oJnA' },
	{
		id: 15437,
		name: 'Miss Americana & The Heartbreak Prince',
		artist: 'Taylor Swift',
		youtubeId: '2B9fBFtBXhU'
	},
	{ id: 55791, name: 'Paper Rings', artist: 'Taylor Swift', youtubeId: '8zdg-pDF10g' },
	{ id: 3439, name: 'Cornelia Street', artist: 'Taylor Swift', youtubeId: 'VikHHWrgb4Y' },
	{ id: 63467, name: 'Death By A Thousand Cuts', artist: 'Taylor Swift', youtubeId: 'GTEFSuFfgnU' },
	{ id: 18105, name: 'London Boy', artist: 'Taylor Swift', youtubeId: 'VsKoOH6DVys' },
	{
		id: 55129,
		name: 'Soon You’ll Get Better (feat. The Chicks)',
		artist: 'Taylor Swift',
		youtubeId: 'tMoW5G5LU08'
	},
	{ id: 46403, name: 'False God', artist: 'Taylor Swift', youtubeId: 'acQXa5ArHIk' },
	{ id: 9056, name: 'You Need To Calm Down', artist: 'Taylor Swift', youtubeId: 'Dkk9gvTmCXY' },
	{ id: 42484, name: 'Afterglow', artist: 'Taylor Swift', youtubeId: '8HxbqAsppwU' },
	{
		id: 27633,
		name: 'ME! (feat. Brendon Urie of Panic! At The Disco)',
		artist: 'Taylor Swift',
		youtubeId: 'FuXNumBwDOM'
	},
	{
		id: 2693,
		name: 'It’s Nice To Have A Friend',
		artist: 'Taylor Swift',
		youtubeId: 'eaP1VswBF28'
	},
	{ id: 40385, name: 'Daylight', artist: 'Taylor Swift', youtubeId: 'u9raS7-NisU' },
	{ id: 8457, name: 'O My Heart', artist: 'Mother Mother', youtubeId: 'O0mGaoKu0fk' },
	{ id: 57921, name: 'Burning Pile', artist: 'Mother Mother', youtubeId: '_ikArCV_zD0' },
	{ id: 59128, name: 'Body of Years', artist: 'Mother Mother', youtubeId: 'hMw1CjD5cY0' },
	{ id: 24745, name: 'Try To Change', artist: 'Mother Mother', youtubeId: 'X5DQEuWcfB0' },
	{ id: 11035, name: 'Wisdom', artist: 'Mother Mother', youtubeId: 'RRi7eNKN5UU' },
	{ id: 7555, name: 'Body', artist: 'Mother Mother', youtubeId: '_AJpDUoUAZI' },
	{ id: 32361, name: 'Ghosting', artist: 'Mother Mother', youtubeId: 'UH-fI8x4-Ps' },
	{ id: 40404, name: 'Hayloft', artist: 'Mother Mother', youtubeId: 'wiXvDsHfpdk' },
	{ id: 64078, name: 'Wrecking Ball', artist: 'Mother Mother', youtubeId: 'RNBDvPmhlvk' },
	{ id: 56200, name: 'Arms Tonite', artist: 'Mother Mother', youtubeId: 'lv1K0H_4mfw' },
	{ id: 23220, name: 'Miles', artist: 'Mother Mother', youtubeId: 'MRWZAsyxBgU' },
	{ id: 526, name: 'Sleep Awake', artist: 'Mother Mother', youtubeId: 'PUevnjNPagE' },
	{ id: 43069, name: 'Cave In', artist: 'Owl City', youtubeId: 'Kiwea1iV6cs' },
	{ id: 45930, name: 'The Bird and the Worm', artist: 'Owl City', youtubeId: '70YIMaEPKzc' },
	{ id: 38125, name: 'Hello Seattle', artist: 'Owl City', youtubeId: 'qBtdQNPG3jk' },
	{ id: 53585, name: 'Umbrella Beach', artist: 'Owl City', youtubeId: 'yRpkRf99tz0' },
	{ id: 17938, name: 'The Saltwater Room', artist: 'Owl City', youtubeId: '8AllgoKzRA8' },
	{ id: 33282, name: 'Dental Care', artist: 'Owl City', youtubeId: 'R3BBj06JAfc' },
	{ id: 29519, name: 'Meteor Shower', artist: 'Owl City', youtubeId: '7ss6uOs28eI' },
	{ id: 40535, name: 'On the Wing', artist: 'Owl City', youtubeId: 'oezkvTeeYWU' },
	{ id: 39762, name: 'Fireflies', artist: 'Owl City', youtubeId: 'psuRGfAaju4' },
	{ id: 24625, name: 'The Tip of the Iceberg', artist: 'Owl City', youtubeId: '0Ym0y8ltPKQ' },
	{ id: 12570, name: 'Vanilla Twilight', artist: 'Owl City', youtubeId: 'pIz2K3ArrWk' },
	{ id: 21750, name: 'Tidal Wave', artist: 'Owl City', youtubeId: 'Z0eTceAgVKU' },
	{ id: 31420, name: 'Hot Air Balloon', artist: 'Owl City', youtubeId: 'BRwBa4ahWqM' },
	{ id: 44860, name: 'Butterfly Wings', artist: 'Owl City', youtubeId: 'YhIPl_3XMgQ' },
	{ id: 59536, name: 'Rugs from Me to You', artist: 'Owl City', youtubeId: 'gQE4iaIWlrw' },
	{ id: 2990, name: 'Sunburn', artist: 'Owl City', youtubeId: 'C4aArJMHqVU' },
	{ id: 46076, name: 'Hello Seattle', artist: 'Owl City', youtubeId: 'Kz0lMQLUsGo' },
	{ id: 55616, name: 'If My Heart Was a House', artist: 'Owl City', youtubeId: 'nKYzqA2Vgco' },
	{ id: 24397, name: 'Strawberry Avalanche', artist: 'Owl City', youtubeId: '1s2EQ3vSqTE' },
	{ id: 48959, name: 'Fireflies', artist: 'Owl City', youtubeId: '7owqrbbdYuc' },
	{ id: 57776, name: 'Airbag', artist: 'Radiohead', youtubeId: 'jNY_wLukVW0' },
	{ id: 3617, name: 'Paranoid Android', artist: 'Radiohead', youtubeId: 'Lt8AfIeJOxw' },
	{ id: 18351, name: 'Subterranean Homesick Alien', artist: 'Radiohead', youtubeId: '_fTWmUlTEqE' },
	{ id: 51142, name: 'Exit Music (For a Film)', artist: 'Radiohead', youtubeId: 'Bf01riuiJWA' },
	{ id: 9989, name: 'Let Down', artist: 'Radiohead', youtubeId: 'ZVgHPSyEIqk' },
	{ id: 56993, name: 'Karma Police', artist: 'Radiohead', youtubeId: '1uYWYWPc9HU' },
	{ id: 20241, name: 'Fitter Happier', artist: 'Radiohead', youtubeId: 'O4SzvsMFaek' },
	{ id: 50441, name: 'Electioneering', artist: 'Radiohead', youtubeId: '3DtgWrFTtQk' },
	{ id: 47759, name: 'Climbing up the Walls', artist: 'Radiohead', youtubeId: 'XX4EpkR-Sp4' },
	{ id: 51179, name: 'No Surprises', artist: 'Radiohead', youtubeId: 'u5CVsCnxyXg' },
	{ id: 41921, name: 'Lucky', artist: 'Radiohead', youtubeId: 'FsyqsnY7dRA' },
	{ id: 40010, name: 'The Tourist', artist: 'Radiohead', youtubeId: 'HkgzObf8uVU' },
	{ id: 4838, name: 'Time to Pretend', artist: 'MGMT', youtubeId: 'B9dSYgd5Elk' },
	{ id: 26999, name: 'Weekend Wars', artist: 'MGMT', youtubeId: '6QJeqwhWWHI' },
	{ id: 16454, name: 'The Youth', artist: 'MGMT', youtubeId: 'jgTrAfS0BD0' },
	{ id: 42615, name: 'Electric Feel', artist: 'MGMT', youtubeId: 'MmZexg8sxyk' },
	{ id: 20610, name: 'Kids', artist: 'MGMT', youtubeId: 'fe4EK4HSPkI' },
	{ id: 11615, name: '4th Dimensional Transition', artist: 'MGMT', youtubeId: 'UVadPWNLiZs' },
	{ id: 29975, name: 'Pieces of What', artist: 'MGMT', youtubeId: 'H9EFlFavYEE' },
	{ id: 14575, name: 'Of Moons, Birds & Monsters', artist: 'MGMT', youtubeId: '4GrnA0aciTg' },
	{ id: 54122, name: 'The Handshake', artist: 'MGMT', youtubeId: 'Nhy6MQ6Yh0c' },
	{ id: 34048, name: 'Future Reflections', artist: 'MGMT', youtubeId: 'KFKsoIdhkpQ' },
	{ id: 39563, name: 'Planet Telex', artist: 'Radiohead', youtubeId: '09EsZXrKEP4' },
	{ id: 16365, name: 'The Bends', artist: 'Radiohead', youtubeId: 'K8z8hLvjb_U' },
	{ id: 27345, name: 'High and Dry', artist: 'Radiohead', youtubeId: '7qFfFVSerQo' },
	{ id: 33445, name: 'Fake Plastic Trees', artist: 'Radiohead', youtubeId: 'n5h0qHwNrHk' },
	{ id: 5172, name: 'Bones', artist: 'Radiohead', youtubeId: '3ZKxungSg9U' },
	{ id: 65224, name: '(Nice Dream)', artist: 'Radiohead', youtubeId: '2vHByVGhmcc' },
	{ id: 29342, name: 'Just', artist: 'Radiohead', youtubeId: 'Qnk4jiWamm4' },
	{ id: 48598, name: 'My Iron Lung', artist: 'Radiohead', youtubeId: 'eHK67LiMI8k' },
	{
		id: 27922,
		name: 'Bullet Proof ... I Wish I Was',
		artist: 'Radiohead',
		youtubeId: 'KkCgUI_g2oo'
	},
	{ id: 1463, name: 'Black Star', artist: 'Radiohead', youtubeId: 'd7lbzUUXj0k' },
	{ id: 18852, name: 'Sulk', artist: 'Radiohead', youtubeId: '-SLb6BdCHlE' },
	{ id: 52952, name: 'Street Spirit (Fade Out)', artist: 'Radiohead', youtubeId: '2y6kop0VTXY' },
	{ id: 47061, name: 'FloriDada', artist: 'Animal Collective', youtubeId: 'cuoIvNFUY7I' },
	{ id: 58496, name: 'Hocus Pocus', artist: 'Animal Collective', youtubeId: 'CQFqSfpy8j0' },
	{ id: 17710, name: 'Vertical', artist: 'Animal Collective', youtubeId: 'yvcyOa00f7s' },
	{ id: 50305, name: 'Lying in the Grass', artist: 'Animal Collective', youtubeId: 'GJXiuj2WdUc' },
	{ id: 59320, name: 'The Burglars', artist: 'Animal Collective', youtubeId: 'NXrzpIXo2WI' },
	{ id: 1236, name: 'Natural Selection', artist: 'Animal Collective', youtubeId: 'HDkmp5ZvrDo' },
	{ id: 44297, name: 'Bagels in Kiev', artist: 'Animal Collective', youtubeId: 'u1ijmmuJ2p8' },
	{ id: 24877, name: 'On Delay', artist: 'Animal Collective', youtubeId: 'ZvySPJ7-Nak' },
	{ id: 40390, name: 'Spilling Guts', artist: 'Animal Collective', youtubeId: 'JXrsTyIjl1M' },
	{ id: 44211, name: 'Summing the Wretch', artist: 'Animal Collective', youtubeId: 'd8UlBSKFAgw' },
	{ id: 25508, name: 'Golden Gal', artist: 'Animal Collective', youtubeId: 'Y7O0rBGSqjI' },
	{ id: 30904, name: 'Recycling', artist: 'Animal Collective', youtubeId: 'kYC4Nu76TMI' },
	{ id: 18555, name: 'The End.', artist: 'My Chemical Romance', youtubeId: 'XkCA2XqUJ4o' },
	{ id: 5135, name: 'Dead!', artist: 'My Chemical Romance', youtubeId: 'H48kOqqaWv0' },
	{
		id: 42747,
		name: 'This Is How I Disappear',
		artist: 'My Chemical Romance',
		youtubeId: '3df8CooYnSs'
	},
	{
		id: 18666,
		name: 'The Sharpest Lives',
		artist: 'My Chemical Romance',
		youtubeId: '73Y_x30uKQg'
	},
	{
		id: 48817,
		name: 'Welcome to the Black Parade',
		artist: 'My Chemical Romance',
		youtubeId: 'RRKJiM9Njr8'
	},
	{ id: 11006, name: "I Don't Love You", artist: 'My Chemical Romance', youtubeId: 'pyi0ZfuIIvo' },
	{ id: 58171, name: 'House of Wolves', artist: 'My Chemical Romance', youtubeId: 'woalhgxmnDo' },
	{ id: 57166, name: 'Cancer', artist: 'My Chemical Romance', youtubeId: 'wc2s9skF_58' },
	{ id: 39145, name: 'Mama', artist: 'My Chemical Romance', youtubeId: 'GEvLye15sq0' },
	{ id: 47500, name: 'Sleep', artist: 'My Chemical Romance', youtubeId: 'RSAoJJzVXYY' },
	{ id: 64782, name: 'Teenagers', artist: 'My Chemical Romance', youtubeId: 'k6EQAOmJrbw' },
	{ id: 31638, name: 'Disenchanted', artist: 'My Chemical Romance', youtubeId: 'j_MlBCb9-m8' },
	{ id: 42283, name: 'Famous Last Words', artist: 'My Chemical Romance', youtubeId: '8bbTtPL1jRs' },
	{
		id: 31338,
		name: 'Blood (Hidden Track)',
		artist: 'My Chemical Romance',
		youtubeId: 'HxN77hBkRcg'
	},
	{
		id: 30320,
		name: 'Lifetime Achievement Award',
		artist: 'Lemon Demon',
		youtubeId: 'ecjnB6Ght8Y'
	},
	{ id: 49990, name: 'Touch-Tone Telephone', artist: 'Lemon Demon', youtubeId: 'e03fvvb9gbU' },
	{ id: 57972, name: 'Cabinet Man', artist: 'Lemon Demon', youtubeId: 'CdxtcvnnlXI' },
	{ id: 22738, name: 'No Eyed Girl', artist: 'Lemon Demon', youtubeId: 'IqFBdBWK9bc' },
	{ id: 43145, name: 'When He Died', artist: 'Lemon Demon', youtubeId: 'LKsolIr3ovk' },
	{ id: 50564, name: 'Sweet Bod', artist: 'Lemon Demon', youtubeId: 'pVDCs-BIIrI' },
	{ id: 16265, name: 'Eighth Wonder', artist: 'Lemon Demon', youtubeId: 'fiddpbEf31I' },
	{ id: 27885, name: 'Ancient Aliens', artist: 'Lemon Demon', youtubeId: 'tKE1hC9mz7Y' },
	{ id: 42912, name: 'Soft Fuzzy Man', artist: 'Lemon Demon', youtubeId: '7AQdzGdieB8' },
	{
		id: 43272,
		name: 'As Your Father I Expressly Forbid It',
		artist: 'Lemon Demon',
		youtubeId: 'gea06zmMFHc'
	},
	{ id: 7564, name: 'I Earn My Life', artist: 'Lemon Demon', youtubeId: 'LESP251Noaw' },
	{ id: 33939, name: 'Reaganomics', artist: 'Lemon Demon', youtubeId: 'S3kTUULBAt0' },
	{ id: 28966, name: 'Man-Made Object', artist: 'Lemon Demon', youtubeId: 'OV7rWPUpNvU' },
	{ id: 60786, name: 'Spiral of Ants', artist: 'Lemon Demon', youtubeId: 'k0V9UqeSVgk' },
	{ id: 41256, name: 'Angelfire (Bonus Track)', artist: 'Lemon Demon', youtubeId: '9seQmGOshks' },
	{
		id: 57570,
		name: 'Angry People (Bonus Tracks)',
		artist: 'Lemon Demon',
		youtubeId: 'EehtkGu7Imk'
	},
	{
		id: 54687,
		name: 'Cabinet Man (Demo) (Bonus Track)',
		artist: 'Lemon Demon',
		youtubeId: '6Ck9aDqRJ3c'
	},
	{ id: 44794, name: 'Cat Hacks (Bonus Track)', artist: 'Lemon Demon', youtubeId: 'wOQa1rc9DFU' },
	{
		id: 47233,
		name: 'Crisis Actors (Bonus Track)',
		artist: 'Lemon Demon',
		youtubeId: 'EZOcLRRDYh4'
	},
	{ id: 62254, name: 'Geocities (Bonus Track)', artist: 'Lemon Demon', youtubeId: 'WfZv-ITcOYw' },
	{ id: 48416, name: 'Gravitron (Bonus Track)', artist: 'Lemon Demon', youtubeId: 'ZlJfKqv4MRg' },
	{
		id: 29990,
		name: 'Kubrick and the Beast (Bonus Track)',
		artist: 'Lemon Demon',
		youtubeId: 'FWoOA4VIX2I'
	},
	{
		id: 23393,
		name: "Moon's Request (Bonus Track)",
		artist: 'Lemon Demon',
		youtubeId: 'y2HVdB4QQPw'
	},
	{
		id: 56977,
		name: 'Pizza Heroes (Bonus Track)',
		artist: 'Lemon Demon',
		youtubeId: 'rBWLH-ijx74'
	},
	{
		id: 28398,
		name: 'Redesign Your Logo (Bonus Track)',
		artist: 'Lemon Demon',
		youtubeId: 'HXk-0_rETJ8'
	},
	{ id: 21149, name: 'Sweet Bod (Bonus Track)', artist: 'Lemon Demon', youtubeId: 'pVDCs-BIIrI' },
	{
		id: 4728,
		name: "You're at the Party (Bonus Track)",
		artist: 'Lemon Demon',
		youtubeId: '-Il7G4KUuHg'
	},
	{ id: 64009, name: 'Bloom', artist: 'Radiohead', youtubeId: 'IxBQ8Er8DYc' },
	{ id: 57859, name: 'Morning Mr. Magpie', artist: 'Radiohead', youtubeId: 'gM9GSuWpM94' },
	{ id: 387, name: 'Little by Little', artist: 'Radiohead', youtubeId: '5c1lulf5Fkw' },
	{ id: 60197, name: 'Feral', artist: 'Radiohead', youtubeId: 'pxXSlEj_1hk' },
	{ id: 53739, name: 'Lotus Flower', artist: 'Radiohead', youtubeId: 'HgMAwBZ2M3w' },
	{ id: 37879, name: 'Codex', artist: 'Radiohead', youtubeId: 'T7t38uDUg5E' },
	{ id: 48056, name: 'Give Up the Ghost', artist: 'Radiohead', youtubeId: 'QGGb7o7EbFs' },
	{ id: 53941, name: 'Separator', artist: 'Radiohead', youtubeId: 'KmpzIU301VU' },
	{ id: 24956, name: 'Cluster One', artist: 'Pink Floyd', youtubeId: 'hoEDw18mkbU' },
	{ id: 50139, name: 'What Do You Want from Me', artist: 'Pink Floyd', youtubeId: 'KmlZ1WhlYsM' },
	{ id: 62127, name: 'Poles Apart', artist: 'Pink Floyd', youtubeId: '5ciWB7VykII' },
	{ id: 44438, name: 'Marooned', artist: 'Pink Floyd', youtubeId: 'P7YMI39sObY' },
	{ id: 53016, name: 'A Great Day for Freedom', artist: 'Pink Floyd', youtubeId: 'NpkQpYjS-O8' },
	{ id: 18841, name: 'Wearing the Inside Out', artist: 'Pink Floyd', youtubeId: 'aRAfpefISk4' },
	{ id: 34578, name: 'Take It Back', artist: 'Pink Floyd', youtubeId: 'Y5rde4bRIZA' },
	{ id: 22968, name: 'Coming Back to Life', artist: 'Pink Floyd', youtubeId: '04LrDEQZmD0' },
	{ id: 3613, name: 'Keep Talking', artist: 'Pink Floyd', youtubeId: 'wbOTkDn49qI' },
	{ id: 46577, name: 'Lost for Words', artist: 'Pink Floyd', youtubeId: 'JhQvjs-faPo' },
	{ id: 10609, name: 'High Hopes', artist: 'Pink Floyd', youtubeId: '7jMlFXouPk8' },
	{ id: 5826, name: 'The Suburbs', artist: 'Arcade Fire', youtubeId: 'BWuYbxdrJoA' },
	{ id: 53688, name: 'The Queen Is Dead', artist: 'The Smiths', youtubeId: 'k30XeJNAbt4' },
	{ id: 33447, name: 'Frankly, Mr. Shankly', artist: 'The Smiths', youtubeId: '1dnCitAqPIM' },
	{ id: 64216, name: "I Know It's Over", artist: 'The Smiths', youtubeId: 'M6o1SEj02t0' },
	{ id: 49946, name: 'Never Had No One Ever', artist: 'The Smiths', youtubeId: 'lYjedww3fNo' },
	{ id: 23378, name: 'Cemetry Gates', artist: 'The Smiths', youtubeId: 'dfXqxjMkyQ4' },
	{ id: 51829, name: 'Bigmouth Strikes Again', artist: 'The Smiths', youtubeId: 'PtzhvJh9NRY' },
	{
		id: 57740,
		name: 'The Boy with the Thorn In His Side',
		artist: 'The Smiths',
		youtubeId: 'qdOHPjMzY8s'
	},
	{ id: 51805, name: 'Vicar In a Tutu', artist: 'The Smiths', youtubeId: 'ke2nucbxP1E' },
	{
		id: 339,
		name: 'There Is a Light That Never Goes Out',
		artist: 'The Smiths',
		youtubeId: '3r-qDvD3F3c'
	},
	{
		id: 37294,
		name: 'Some Girls Are Bigger Than Others',
		artist: 'The Smiths',
		youtubeId: 'C906lbkcYug'
	},
	{ id: 56940, name: 'This Is Why', artist: 'Paramore', youtubeId: '_Eb4r-GU-yo' },
	{ id: 38700, name: 'The News', artist: 'Paramore', youtubeId: 'YSFa_wOZPXg' },
	{ id: 8925, name: 'Running Out Of Time', artist: 'Paramore', youtubeId: 'toKJP3luQbI' },
	{ id: 3649, name: 'C’est Comme Ça', artist: 'Paramore', youtubeId: '0tGeMr5iXoA' },
	{ id: 60818, name: 'Big Man, Little Dignity', artist: 'Paramore', youtubeId: 'Z91DX87wWtg' },
	{ id: 37687, name: 'You First', artist: 'Paramore', youtubeId: 'cL55NhsiwyQ' },
	{ id: 24065, name: 'Figure 8', artist: 'Paramore', youtubeId: 'NoNDdl3z21M' },
	{ id: 17296, name: 'Liar', artist: 'Paramore', youtubeId: 'LBIE63c6fjI' },
	{ id: 55575, name: 'Crave', artist: 'Paramore', youtubeId: '7OM7Hoe_cv8' },
	{ id: 30414, name: 'Thick Skull', artist: 'Paramore', youtubeId: 'JLMc-m1pRSU' },
	{ id: 13649, name: "A Lot's Gonna Change", artist: 'Weyes Blood', youtubeId: '7OrVUk61wHE' },
	{ id: 46007, name: 'Andromeda', artist: 'Weyes Blood', youtubeId: 'Aki1Xn36eJ8' },
	{ id: 29193, name: 'Everyday', artist: 'Weyes Blood', youtubeId: 'AJ-BFlTo5ag' },
	{ id: 4416, name: 'Something to Believe', artist: 'Weyes Blood', youtubeId: 'mt2o_VMWiEw' },
	{ id: 37065, name: 'Titanic Rising', artist: 'Weyes Blood', youtubeId: 'pK06q1N8FtY' },
	{ id: 56891, name: 'Movies', artist: 'Weyes Blood', youtubeId: 'RFtRq6t3jOo' },
	{ id: 7624, name: 'Mirror Forever', artist: 'Weyes Blood', youtubeId: 'tQ1CH2_Arws' },
	{ id: 63528, name: 'Wild Time', artist: 'Weyes Blood', youtubeId: 'kjfpNOwMpeM' },
	{ id: 44464, name: 'Picture Me Better', artist: 'Weyes Blood', youtubeId: 'wKS76C-da6k' },
	{ id: 24314, name: 'Nearer to Thee', artist: 'Weyes Blood', youtubeId: 'mgVOzdzwf-Q' },
	{ id: 33783, name: 'Star Treatment', artist: 'Arctic Monkeys', youtubeId: 'f_2rM8A_1-w' },
	{ id: 28921, name: 'One Point Perspective', artist: 'Arctic Monkeys', youtubeId: 'qL4m04OyCkY' },
	{ id: 59526, name: 'American Sports', artist: 'Arctic Monkeys', youtubeId: 'xvOrayAVhBo' },
	{
		id: 27061,
		name: 'Tranquility Base Hotel & Casino',
		artist: 'Arctic Monkeys',
		youtubeId: 'uvBk9Oom05I'
	},
	{ id: 13258, name: 'Golden Trunks', artist: 'Arctic Monkeys', youtubeId: '31hMzRNeIq4' },
	{ id: 30307, name: 'Four out of Five', artist: 'Arctic Monkeys', youtubeId: '71Es-8FfATo' },
	{
		id: 6025,
		name: "The World's First Ever Monster Truck Front Flip",
		artist: 'Arctic Monkeys',
		youtubeId: 'kwQT4jnbAso'
	},
	{ id: 53988, name: 'Science Fiction', artist: 'Arctic Monkeys', youtubeId: 'qMI9GXTLZyI' },
	{ id: 26897, name: 'She Looks Like Fun', artist: 'Arctic Monkeys', youtubeId: 'eLYeiimWLoY' },
	{ id: 24875, name: 'Batphone', artist: 'Arctic Monkeys', youtubeId: 'zM1KK2xX4_w' },
	{ id: 27754, name: 'The Ultracheese', artist: 'Arctic Monkeys', youtubeId: 'Muil_PtJURY' },
	{ id: 55798, name: 'In the Flesh?', artist: 'Pink Floyd', youtubeId: 'iLFwTqdsuxw' },
	{ id: 2936, name: 'The Thin Ice', artist: 'Pink Floyd', youtubeId: 'Ciai1aZ_odg' },
	{
		id: 40827,
		name: 'Another Brick In the Wall, Pt. 1',
		artist: 'Pink Floyd',
		youtubeId: '-cfJqYtmmqA'
	},
	{
		id: 42081,
		name: 'The Happiest Days of Our Lives',
		artist: 'Pink Floyd',
		youtubeId: 'VyTarjUjNMQ'
	},
	{
		id: 13179,
		name: 'Another Brick In the Wall, Pt. 2',
		artist: 'Pink Floyd',
		youtubeId: 'zz8frWcmthA'
	},
	{ id: 22318, name: 'Mother', artist: 'Pink Floyd', youtubeId: 'xe3NUKCnZp4' },
	{ id: 34815, name: 'Goodbye Blue Sky', artist: 'Pink Floyd', youtubeId: 'bn6YnUt4Vuk' },
	{ id: 34993, name: 'Empty Spaces', artist: 'Pink Floyd', youtubeId: 'zL5AJHijgag' },
	{ id: 56297, name: 'Young Lust', artist: 'Pink Floyd', youtubeId: 'YiVPC8QHsQM' },
	{ id: 14049, name: 'One of My Turns', artist: 'Pink Floyd', youtubeId: 'NLWEpS5ixO8' },
	{ id: 37048, name: "Don't Leave Me Now", artist: 'Pink Floyd', youtubeId: '1SmCTDgBHyw' },
	{
		id: 64842,
		name: 'Another Brick In the Wall, Pt. 3',
		artist: 'Pink Floyd',
		youtubeId: 'c05aOG5p0P4'
	},
	{ id: 20529, name: 'Goodbye Cruel World', artist: 'Pink Floyd', youtubeId: '9h6ZXKHv19A' },
	{ id: 20615, name: 'Hey You', artist: 'Pink Floyd', youtubeId: 'soL8JK6kALc' },
	{
		id: 21103,
		name: 'Is There Anybody Out There?',
		artist: 'Pink Floyd',
		youtubeId: 'CIxYe3G3Iz4'
	},
	{ id: 25191, name: 'Nobody Home', artist: 'Pink Floyd', youtubeId: 'gNMGrkCNLVk' },
	{ id: 31984, name: 'Vera', artist: 'Pink Floyd', youtubeId: 'bCawgpFg_Bg' },
	{ id: 40572, name: 'Bring the Boys Back Home', artist: 'Pink Floyd', youtubeId: 'ZVEWtWjKIq4' },
	{ id: 58606, name: 'Comfortably Numb', artist: 'Pink Floyd', youtubeId: 'x-xTttimcNk' },
	{ id: 2170, name: 'The Show Must Go On', artist: 'Pink Floyd', youtubeId: '0_t55mbHFps' },
	{ id: 3807, name: 'In the Flesh', artist: 'Pink Floyd', youtubeId: 'GGGO9nPO0Po' },
	{ id: 58779, name: 'Run Like Hell', artist: 'Pink Floyd', youtubeId: 'j2s8yGMEbSs' },
	{ id: 4798, name: 'Waiting for the Worms', artist: 'Pink Floyd', youtubeId: 'jeICC5SFpP0' },
	{ id: 31782, name: 'Stop', artist: 'Pink Floyd', youtubeId: 'Pils34Td_wE' },
	{ id: 12389, name: 'The Trial', artist: 'Pink Floyd', youtubeId: 'AdzHBpxZWVM' },
	{ id: 42347, name: 'Outside the Wall', artist: 'Pink Floyd', youtubeId: 'fXAmuUpaN-U' },
	{ id: 58449, name: 'Duvet', artist: 'Boa', youtubeId: 'o7fgFaXKVa0' },
	{ id: 2589, name: 'Twilight', artist: 'Boa', youtubeId: 'KzxJXysxgRY' },
	{ id: 24824, name: 'Fool', artist: 'Boa', youtubeId: 'HUnnxRicDwM' },
	{ id: 32733, name: 'Rain', artist: 'Boa', youtubeId: 'kCyfgSw3ups' },
	{ id: 30347, name: 'Elephant', artist: 'Boa', youtubeId: 'kD4_Lgryk64' },
	{ id: 40035, name: 'Scoring', artist: 'Boa', youtubeId: 'remPqI8QRzU' },
	{ id: 24508, name: 'Deeply', artist: 'Boa', youtubeId: 'viBScBhu9sA' },
	{ id: 37553, name: 'One Day', artist: 'Boa', youtubeId: 'uMuXRBuMCxQ' },
	{ id: 6549, name: 'Welcome', artist: 'Boa', youtubeId: 'J5IDd-F90k0' },
	{ id: 43502, name: 'For Jasmine', artist: 'Boa', youtubeId: 'l6zvOrJynVU' },
	{ id: 31108, name: 'Anna Maria', artist: 'Boa', youtubeId: 'BsvJdQBckOE' },
	{ id: 61037, name: 'Duvet', artist: 'Boa', youtubeId: 'KQiz9Wjwh-I' },
	{ id: 57870, name: 'Little Miss', artist: 'Boa', youtubeId: 'EpOQMehVRnA' },
	{ id: 51269, name: 'Drinking', artist: 'Boa', youtubeId: 'tyXBsQnh518' },
	{ id: 20498, name: 'Kaleidoskull', artist: 'Lemon Demon', youtubeId: 'Jot442uXmxk' },
	{ id: 38112, name: 'Amnesia Was Her Name', artist: 'Lemon Demon', youtubeId: 'pH3VEx4Ox3M' },
	{
		id: 1777,
		name: 'The Man In Stripes and Glasses',
		artist: 'Lemon Demon',
		youtubeId: '25a8Hhnt2jk'
	},
	{ id: 46869, name: 'Marketland', artist: 'Lemon Demon', youtubeId: 'eUmSnU_MlIo' },
	{ id: 52255, name: 'Gadzooks', artist: 'Lemon Demon', youtubeId: 'vVLXhashbeE' },
	{ id: 40751, name: 'Knife Fight', artist: 'Lemon Demon', youtubeId: '6Wqmu9OPPcc' },
	{
		id: 12714,
		name: "The Only House That's Not On Fire (Yet)",
		artist: 'Lemon Demon',
		youtubeId: 'LwntIpXvV-Q'
	},
	{ id: 11986, name: 'The Ocean', artist: 'Lemon Demon', youtubeId: '5P9_FHeFRcc' },
	{ id: 22332, name: 'The Afternoon', artist: 'Lemon Demon', youtubeId: 'qbxJgfV0mEA' },
	{ id: 63450, name: 'Spring Heeled Jack', artist: 'Lemon Demon', youtubeId: 'NVt2MQAnV5A' },
	{ id: 32802, name: 'Being a Rock Star', artist: 'Lemon Demon', youtubeId: 'KSB7nCxLzmY' },
	{ id: 15310, name: 'Ask for Nothing', artist: 'Lemon Demon', youtubeId: 'eFOuUHsM8x0' },
	{ id: 22683, name: "The Satirist's Love Song", artist: 'Lemon Demon', youtubeId: 'O_rfgcuDSCM' },
	{ id: 14620, name: 'The Machine', artist: 'Lemon Demon', youtubeId: '849q2h1OkKs' },
	{ id: 19122, name: 'Bill Watterson', artist: 'Lemon Demon', youtubeId: 'UTaszc1Q6eY' },
	{ id: 7448, name: 'Something Glowing', artist: 'Lemon Demon', youtubeId: 'fIT1RSAcTDo' },
	{ id: 61192, name: '320x200', artist: 'Lemon Demon', youtubeId: 'Tx6ZJGjUO6M' },
	{ id: 40565, name: 'Ben Bernanke', artist: 'Lemon Demon', youtubeId: 'axq_g4gouac' },
	{ id: 59266, name: 'Drinky-bird', artist: 'Lemon Demon', youtubeId: 'fnlcm1OA8HE' },
	{ id: 15769, name: 'Modify', artist: 'Lemon Demon', youtubeId: 'uvxRD7mEfuU' },
	{ id: 5490, name: 'Nightmare Fuel', artist: 'Lemon Demon', youtubeId: 'X-YiSXWSGR4' },
	{ id: 33953, name: 'Sundial', artist: 'Lemon Demon', youtubeId: 'tdbhU7EHAhc' },
	{
		id: 6130,
		name: 'The Wiggles Hate Each Other In Real Life',
		artist: 'Lemon Demon',
		youtubeId: '9Lu8Kd-jDEQ'
	},
	{ id: 27284, name: 'The Root of All Evil', artist: 'Dream Theater', youtubeId: 'aK0Gi-bhC-o' },
	{ id: 63793, name: 'The Answer Lies Within', artist: 'Dream Theater', youtubeId: 'QK6OpqAhbuU' },
	{ id: 34622, name: 'These Walls', artist: 'Dream Theater', youtubeId: '41Z1amot0QM' },
	{ id: 45846, name: 'I Walk Beside You', artist: 'Dream Theater', youtubeId: 'RGiTss6y5-o' },
	{ id: 25581, name: 'Panic Attack', artist: 'Dream Theater', youtubeId: 'cs8rkoouPSU' },
	{ id: 28062, name: 'Never Enough', artist: 'Dream Theater', youtubeId: 'EpCUy-91aUo' },
	{ id: 11370, name: 'Sacrificed Sons', artist: 'Dream Theater', youtubeId: 'xJinRZkANVs' },
	{ id: 38236, name: 'Octavarium', artist: 'Dream Theater', youtubeId: 'XYV8Zt2k0RQ' },
	{ id: 12006, name: 'Kyoto', artist: 'Phoebe Bridgers', youtubeId: 'Tw0zYd0eIlk' },
	{
		id: 59984,
		name: 'The King of Carrot Flowers, Pt. 1',
		artist: 'Neutral Milk Hotel',
		youtubeId: 'jsM7XS-2X50'
	},
	{
		id: 63366,
		name: 'The King of Carrot Flowers, Pts. 2 & 3',
		artist: 'Neutral Milk Hotel',
		youtubeId: '82GmKPbF4XM'
	},
	{
		id: 41898,
		name: 'In the Aeroplane Over the Sea',
		artist: 'Neutral Milk Hotel',
		youtubeId: '1FeD16vu_qQ'
	},
	{ id: 39329, name: 'Two-Headed Boy', artist: 'Neutral Milk Hotel', youtubeId: 'MX9iW7n9qWQ' },
	{ id: 54013, name: 'The Fool', artist: 'Neutral Milk Hotel', youtubeId: 'B70a1An-X-s' },
	{ id: 50019, name: 'Holland, 1945', artist: 'Neutral Milk Hotel', youtubeId: '3eNK38nmzw4' },
	{ id: 54551, name: 'Communist Daughter', artist: 'Neutral Milk Hotel', youtubeId: 'RAw7k6o03EI' },
	{ id: 38083, name: 'Oh Comely', artist: 'Neutral Milk Hotel', youtubeId: 'DXSY0aspgKo' },
	{ id: 31865, name: 'Ghost', artist: 'Neutral Milk Hotel', youtubeId: 'Gkl8WiWFw0M' },
	{ id: 30848, name: 'Untitled', artist: 'Neutral Milk Hotel', youtubeId: 'wmnVESaiRqw' },
	{
		id: 9781,
		name: 'Two-Headed Boy, Pt. 2',
		artist: 'Neutral Milk Hotel',
		youtubeId: 'kq5l0MT_Ivg'
	},
	{ id: 50398, name: 'She Works Out Too Much', artist: 'MGMT', youtubeId: 'e0QT4N-5PA4' },
	{ id: 58218, name: 'Little Dark Age', artist: 'MGMT', youtubeId: 'rtL5oMyBHPs' },
	{ id: 5949, name: 'When You Die', artist: 'MGMT', youtubeId: 'tmozGmGoJuw' },
	{ id: 60383, name: 'Me and Michael', artist: 'MGMT', youtubeId: 'OTHHeIAYfuU' },
	{ id: 43452, name: 'Tslamp', artist: 'MGMT', youtubeId: 'T8EL51jlrJA' },
	{ id: 39397, name: 'James', artist: 'MGMT', youtubeId: 'elFDoNlj2XI' },
	{ id: 11167, name: 'Days That Got Away', artist: 'MGMT', youtubeId: 'xBFd6w3KnAI' },
	{ id: 17799, name: 'One Thing Left to Try', artist: 'MGMT', youtubeId: 'AriwjiWyxsM' },
	{ id: 11767, name: "When You're Small", artist: 'MGMT', youtubeId: '5Li-LgF73fI' },
	{ id: 51236, name: 'Hand It Over', artist: 'MGMT', youtubeId: 'DGMXOfpdgF8' },
	{ id: 55219, name: 'COPYCAT', artist: 'Billie Eilish', youtubeId: 'ebb5AinKxWI' },
	{ id: 33097, name: 'idontwannabeyouanymore', artist: 'Billie Eilish', youtubeId: '-tn2S3kJlyU' },
	{ id: 6148, name: 'my boy', artist: 'Billie Eilish', youtubeId: 'dVUmSgzgOqs' },
	{ id: 43420, name: 'watch', artist: 'Billie Eilish', youtubeId: '9dobJDxPEzM' },
	{ id: 23295, name: 'party favor', artist: 'Billie Eilish', youtubeId: 'tGHTOVw6F4Q' },
	{ id: 43526, name: 'bellyache', artist: 'Billie Eilish', youtubeId: 'gBRi6aZJGj4' },
	{ id: 33058, name: 'ocean eyes', artist: 'Billie Eilish', youtubeId: '3IUqoyTxEU8' },
	{ id: 46369, name: 'hostage', artist: 'Billie Eilish', youtubeId: 'skHbZBsS7hM' },
	{ id: 13801, name: '&burn', artist: 'Billie Eilish & Vince Staples', youtubeId: 'BbQlBOHwZz8' },
	{ id: 24015, name: '!!!!!!!', artist: 'Billie Eilish', youtubeId: 'OORBa32WFcM' },
	{ id: 5868, name: 'bad guy', artist: 'Billie Eilish', youtubeId: 'DyDfgMOUjCI' },
	{ id: 24424, name: 'xanny', artist: 'Billie Eilish', youtubeId: 'LZyybvVx-js' },
	{
		id: 32725,
		name: 'you should see me in a crown',
		artist: 'Billie Eilish',
		youtubeId: 'Ah0Ys50CqO8'
	},
	{
		id: 27969,
		name: 'all the good girls go to hell',
		artist: 'Billie Eilish',
		youtubeId: '-PZsSWwc9xA'
	},
	{ id: 6316, name: 'wish you were gay', artist: 'Billie Eilish', youtubeId: 'yaJx0Gj_LCY' },
	{ id: 39758, name: "when the party's over", artist: 'Billie Eilish', youtubeId: 'pbMwTqkKSps' },
	{ id: 42154, name: '8', artist: 'Billie Eilish', youtubeId: 'OZYd9JxithE' },
	{ id: 10108, name: 'my strange addiction', artist: 'Billie Eilish', youtubeId: 'k1ATPhkVWi0' },
	{ id: 10100, name: 'bury a friend', artist: 'Billie Eilish', youtubeId: 'HUHC9tYz8ik' },
	{ id: 63870, name: 'ilomilo', artist: 'Billie Eilish', youtubeId: '-e7wiyNO2us' },
	{ id: 65378, name: 'listen before i go', artist: 'Billie Eilish', youtubeId: 'P4z1O3miesI' },
	{ id: 38781, name: 'i love you', artist: 'Billie Eilish', youtubeId: 'WiinVuzh4DA' },
	{ id: 34567, name: 'goodbye', artist: 'Billie Eilish', youtubeId: 'vciZvVJyNYU' },
	{ id: 45835, name: 'everything i wanted', artist: 'Billie Eilish', youtubeId: 'iuINiqxtjhI' },
	{ id: 54699, name: 'Getting Older', artist: 'Billie Eilish', youtubeId: '7AS9r_E0PY4' },
	{
		id: 38501,
		name: "I Didn't Change My Number",
		artist: 'Billie Eilish',
		youtubeId: 'FP-IopSHomc'
	},
	{ id: 22037, name: 'Billie Bossa Nova', artist: 'Billie Eilish', youtubeId: '4tZ969oc-yI' },
	{ id: 65398, name: 'my future', artist: 'Billie Eilish', youtubeId: 'BKznMmrEXzU' },
	{ id: 21719, name: 'Oxytocin', artist: 'Billie Eilish', youtubeId: 'Fcd8UbutjIg' },
	{ id: 1775, name: 'GOLDWING', artist: 'Billie Eilish', youtubeId: 'JpL7scu-EmY' },
	{ id: 20814, name: 'Lost Cause', artist: 'Billie Eilish', youtubeId: 'S2dRcipMCpw' },
	{ id: 60446, name: "Halley's Comet", artist: 'Billie Eilish', youtubeId: 'geUYm3f6ZA4' },
	{ id: 6760, name: 'Not My Responsibility', artist: 'Billie Eilish', youtubeId: '4HfbgDLUmpk' },
	{ id: 53691, name: 'OverHeated', artist: 'Billie Eilish', youtubeId: 'vg6V2UWSjiM' },
	{ id: 50336, name: 'Everybody Dies', artist: 'Billie Eilish', youtubeId: 'FpeZsTo5hZw' },
	{ id: 21505, name: 'Your Power', artist: 'Billie Eilish', youtubeId: 'fzeWc3zh01g' },
	{ id: 62430, name: 'NDA', artist: 'Billie Eilish', youtubeId: 'OORBa32WFcM' },
	{ id: 34030, name: 'Therefore I Am', artist: 'Billie Eilish', youtubeId: 'oDn4eKyhSH4' },
	{ id: 19757, name: 'Happier Than Ever', artist: 'Billie Eilish', youtubeId: 'NSTUVHsb9xw' },
	{ id: 865, name: 'Male Fantasy', artist: 'Billie Eilish', youtubeId: 'G_BhUxx-cwk' },
	{
		id: 54183,
		name: 'American Boy (feat. Kanye West)',
		artist: 'Estelle',
		youtubeId: 'B7QDB1IEqa8'
	},
	{ id: 31405, name: 'American Teen', artist: 'Khalid', youtubeId: 'M5t_fgRuLLM' },
	{ id: 34713, name: 'Young Dumb & Broke', artist: 'Khalid', youtubeId: 'IPfJnp1guPc' },
	{ id: 6184, name: 'Location', artist: 'Khalid', youtubeId: 'by3yRdlQvzs' },
	{ id: 519, name: 'Another Sad Love Song', artist: 'Khalid', youtubeId: 'aiotIZtLCgc' },
	{ id: 29926, name: 'Saved', artist: 'Khalid', youtubeId: 'Oapebl0bADA' },
	{ id: 18862, name: 'Coaster', artist: 'Khalid', youtubeId: 'Ow-6QCD8588' },
	{ id: 21841, name: '8TEEN', artist: 'Khalid', youtubeId: 'KZTbbE1sNF8' },
	{ id: 56202, name: "Let's Go", artist: 'Khalid', youtubeId: 'yMZRXELs5rI' },
	{ id: 22124, name: 'Hopeless', artist: 'Khalid', youtubeId: 'l8CbTnVZY3Y' },
	{ id: 17295, name: 'Cold Blooded', artist: 'Khalid', youtubeId: '2L8F38LrAag' },
	{ id: 16226, name: 'Winter', artist: 'Khalid', youtubeId: '_14qQB1Pyq0' },
	{ id: 60204, name: 'Therapy', artist: 'Khalid', youtubeId: 'a6liGK_VP8A' },
	{ id: 56182, name: 'Keep Me', artist: 'Khalid', youtubeId: 'hH4i_0nMgro' },
	{ id: 18652, name: 'Shot Down', artist: 'Khalid', youtubeId: '0fVe809KbUM' },
	{ id: 54484, name: 'Angels', artist: 'Khalid', youtubeId: 'JA_K8gP7MYY' },
	{ id: 40214, name: 'Starboy (feat. Daft Punk)', artist: 'The Weeknd', youtubeId: '34Na4j8AVgA' },
	{ id: 8554, name: 'Party Monster', artist: 'The Weeknd', youtubeId: 'diW6jXhLE0E' },
	{ id: 38847, name: 'False Alarm', artist: 'The Weeknd', youtubeId: 'CW5oGRx9CLM' },
	{ id: 43932, name: 'Reminder', artist: 'The Weeknd', youtubeId: 'JZjAg6fK-BQ' },
	{ id: 2935, name: 'Rockin’', artist: 'The Weeknd', youtubeId: 'Nox2RGWOOdE' },
	{ id: 35450, name: 'Secrets', artist: 'The Weeknd', youtubeId: 'eXDU9um19HM' },
	{ id: 18972, name: 'True Colors', artist: 'The Weeknd', youtubeId: 'VQ5XQYpx2mg' },
	{
		id: 17533,
		name: 'Stargirl Interlude (feat. Lana Del Rey)',
		artist: 'The Weeknd',
		youtubeId: 'TkxVOa6u59M'
	},
	{
		id: 62777,
		name: 'Sidewalks (feat. Kendrick Lamar)',
		artist: 'The Weeknd',
		youtubeId: 'sK-T-cmznY8'
	},
	{ id: 23247, name: 'Six Feet Under', artist: 'The Weeknd', youtubeId: 'Yu7kHJqKRW8' },
	{ id: 64815, name: 'Love To Lay', artist: 'The Weeknd', youtubeId: 'dB4YSEHG3ac' },
	{ id: 10995, name: 'A Lonely Night', artist: 'The Weeknd', youtubeId: 'iBnLoAE9kUE' },
	{ id: 9290, name: 'Attention', artist: 'The Weeknd', youtubeId: '3tHuJAZpYNw' },
	{ id: 30620, name: 'Ordinary Life', artist: 'The Weeknd', youtubeId: 'PlJV9IesfIk' },
	{ id: 52724, name: 'Nothing Without You', artist: 'The Weeknd', youtubeId: 'WFO7r3g-JBc' },
	{ id: 12797, name: 'All I Know (feat. Future)', artist: 'The Weeknd', youtubeId: '4iSEJB1KJ0w' },
	{ id: 8207, name: 'Die For You', artist: 'The Weeknd', youtubeId: 'uPD0QOGTmMI' },
	{
		id: 58193,
		name: 'I Feel It Coming (feat. Daft Punk)',
		artist: 'The Weeknd',
		youtubeId: 'qFLhGq0060w'
	},
	{ id: 6680, name: 'ATTENTION', artist: 'Joji', youtubeId: 'ulMHhPHYCi0' },
	{ id: 51062, name: 'SLOW DANCING IN THE DARK', artist: 'Joji', youtubeId: 'vzjUs5yR68o' },
	{ id: 65139, name: 'TEST DRIVE', artist: 'Joji', youtubeId: 'PEBS2jbZce4' },
	{ id: 37198, name: 'WANTED U', artist: 'Joji', youtubeId: 'yLS90RD585o' },
	{
		id: 48804,
		name: "CAN'T GET OVER YOU (feat. Clams Casino)",
		artist: 'Joji',
		youtubeId: 'Y8avxE0yPgE'
	},
	{ id: 24371, name: 'YEAH RIGHT', artist: 'Joji', youtubeId: 'tG7wLK4aAOE' },
	{
		id: 40391,
		name: 'WHY AM I STILL IN LA (feat. Shlohmo & D33J)',
		artist: 'Joji',
		youtubeId: 'fD-i3kkqHI8'
	},
	{ id: 61270, name: 'NO FUN', artist: 'Joji', youtubeId: '8Vlej7QUGGE' },
	{ id: 19561, name: 'COME THRU', artist: 'Joji', youtubeId: '7QrEkeXZJLg' },
	{ id: 54859, name: 'R.I.P. (feat. Trippie Redd)', artist: 'Joji', youtubeId: 'GHZhESYJNzI' },
	{ id: 30927, name: 'XNXX', artist: 'Joji', youtubeId: 'iBUnToeuY18' },
	{ id: 50370, name: "I'LL SEE YOU IN 40", artist: 'Joji', youtubeId: 'vljirbsjYMc' },
	{ id: 3925, name: 'brutal', artist: 'Olivia Rodrigo', youtubeId: 'OGUy2UmRxJ0' },
	{ id: 25292, name: 'traitor', artist: 'Olivia Rodrigo', youtubeId: '4QLvEIXlF6Q' },
	{ id: 881, name: 'drivers license', artist: 'Olivia Rodrigo', youtubeId: 'l0txe6yk8Kc' },
	{
		id: 6104,
		name: '1 step forward, 3 steps back',
		artist: 'Olivia Rodrigo',
		youtubeId: 'w-HfMiue7-k'
	},
	{ id: 63159, name: 'deja vu', artist: 'Olivia Rodrigo', youtubeId: 'pHw5jgsE_pY' },
	{ id: 28464, name: 'good 4 u', artist: 'Olivia Rodrigo', youtubeId: 'gNi_6U5Pm_o' },
	{ id: 34833, name: 'enough for you', artist: 'Olivia Rodrigo', youtubeId: 'AqRXiQkyxvI' },
	{ id: 29868, name: 'happier', artist: 'Olivia Rodrigo', youtubeId: 'GBFWUR8XttQ' },
	{ id: 29106, name: 'jealousy, jealousy', artist: 'Olivia Rodrigo', youtubeId: 'Z-9gQjUZMm0' },
	{ id: 7444, name: 'favorite crime', artist: 'Olivia Rodrigo', youtubeId: 'AyX_LL9nWSE' },
	{ id: 60735, name: 'hope ur ok', artist: 'Olivia Rodrigo', youtubeId: 'ZLlsmB1D4Q0' },
	{ id: 61583, name: 'Arithmophobia', artist: 'Animals As Leaders', youtubeId: 'qntP7XDocI0' },
	{ id: 25505, name: 'Ectogenesis', artist: 'Animals As Leaders', youtubeId: 'Q6zQajZ1_7U' },
	{
		id: 12487,
		name: 'Cognitive Contortions',
		artist: 'Animals As Leaders',
		youtubeId: 'y5SloXeEePU'
	},
	{ id: 2800, name: 'Inner Assassins', artist: 'Animals As Leaders', youtubeId: 'HFmckVPQJqY' },
	{
		id: 47994,
		name: 'Private Visions of the World',
		artist: 'Animals As Leaders',
		youtubeId: 'DZGmbGauSAQ'
	},
	{ id: 42543, name: 'Backpfeifengesicht', artist: 'Animals As Leaders', youtubeId: 'OLKmV9wxQ7g' },
	{ id: 44929, name: 'Transcentience', artist: 'Animals As Leaders', youtubeId: '2ij6A6Up2mI' },
	{ id: 12307, name: 'The Glass Bridge', artist: 'Animals As Leaders', youtubeId: '99eWlyOi6Z8' },
	{ id: 9596, name: 'The Brain Dance', artist: 'Animals As Leaders', youtubeId: 'zSTJP_P4sL4' },
	{ id: 50658, name: 'Apeirophobia', artist: 'Animals As Leaders', youtubeId: 'kNPQqFTujVk' },
	{ id: 7265, name: 'Uprising', artist: 'Muse', youtubeId: 'w8KQmps-Sog' },
	{ id: 34280, name: 'Resistance', artist: 'Muse', youtubeId: 'ywpJACWd0dA' },
	{ id: 57196, name: 'Undisclosed Desires', artist: 'Muse', youtubeId: 'R8OOWcsFj0U' },
	{
		id: 63216,
		name: 'United States of Eurasia (+Collateral Damage)',
		artist: 'Muse',
		youtubeId: 'RaTPw8M0NbM'
	},
	{ id: 4410, name: 'Guiding Light', artist: 'Muse', youtubeId: 'jCnjC8knH2U' },
	{ id: 33032, name: 'Unnatural Selection', artist: 'Muse', youtubeId: 'T23AY5gYhpE' },
	{ id: 21468, name: 'MK Ultra', artist: 'Muse', youtubeId: 'nLoJodvQDrk' },
	{
		id: 63074,
		name: "I Belong to You (+Mon Coeur S'Ouvre a Ta Voix)",
		artist: 'Muse',
		youtubeId: '8ttu6RxqbZg'
	},
	{
		id: 30442,
		name: 'Exogenesis: Symphony, Pt. 1 (Overture)',
		artist: 'Muse',
		youtubeId: 'wDmOnqrjH7w'
	},
	{
		id: 25561,
		name: 'Exogenesis: Symphony, Pt. 2 (Cross-pollination)',
		artist: 'Muse',
		youtubeId: 'VMM1X8aXlCs'
	},
	{
		id: 64747,
		name: 'Exogenesis: Symphony, Pt. 3 (Redemption)',
		artist: 'Muse',
		youtubeId: 'wRCzchqOSxk'
	},
	{ id: 33529, name: 'Take a Bow', artist: 'Muse', youtubeId: '_v8zDNNaWak' },
	{ id: 1091, name: 'Starlight', artist: 'Muse', youtubeId: 'Pgum6OT_VH8' },
	{ id: 64600, name: 'Supermassive Black Hole', artist: 'Muse', youtubeId: 'Xsp3_a-PMTw' },
	{ id: 60833, name: 'Map of the Problematique', artist: 'Muse', youtubeId: 'Nw5AMCEiZms' },
	{ id: 20787, name: "Soldier's Poem", artist: 'Muse', youtubeId: 'aVrK9_R2f2Q' },
	{ id: 56318, name: 'Invincible', artist: 'Muse', youtubeId: 'QX52_M4mbDY' },
	{ id: 28161, name: 'Assassin', artist: 'Muse', youtubeId: 'nNPSSs1xnpY' },
	{ id: 36631, name: 'Exo-Politics', artist: 'Muse', youtubeId: 'KAkhzJCzDTc' },
	{ id: 10844, name: 'City of Delusion', artist: 'Muse', youtubeId: 'Nv-cni9Sjpk' },
	{ id: 28873, name: 'Hoodoo', artist: 'Muse', youtubeId: '8jWw0Rr47-M' },
	{ id: 54387, name: 'Knights of Cydonia', artist: 'Muse', youtubeId: 'G_sBOsh-vyI' },
	{ id: 29282, name: 'Glorious (Bonus Track)', artist: 'Muse', youtubeId: 'lTDOhoPi7m8' },
	{ id: 8535, name: 'Signs of Life', artist: 'Pink Floyd', youtubeId: '9s4JU5gJ1zQ' },
	{ id: 17136, name: 'Learning to Fly', artist: 'Pink Floyd', youtubeId: 'nVhNCTH8pDs' },
	{ id: 46663, name: 'The Dogs of War', artist: 'Pink Floyd', youtubeId: '0XrYoNbO-78' },
	{ id: 9551, name: 'One Slip', artist: 'Pink Floyd', youtubeId: '58qCZbxSvQk' },
	{ id: 62355, name: 'On the Turning Away', artist: 'Pink Floyd', youtubeId: 'KjGXnSdVwCY' },
	{ id: 58879, name: 'Yet Another Movie', artist: 'Pink Floyd', youtubeId: 'UXwUYDG7yR0' },
	{ id: 39034, name: 'Round and Around', artist: 'Pink Floyd', youtubeId: 'yMYuL6M_ins' },
	{ id: 19461, name: 'A New Machine, Pt. 1', artist: 'Pink Floyd', youtubeId: 'dm9ipOgXNFw' },
	{ id: 35732, name: 'Terminal Frost', artist: 'Pink Floyd', youtubeId: 'KIN-_hNKPK8' },
	{ id: 31196, name: 'A New Machine, Pt. 2', artist: 'Pink Floyd', youtubeId: 'FCxisIIO3DI' },
	{ id: 53794, name: 'Sorrow', artist: 'Pink Floyd', youtubeId: 'nPM-QSCnNas' },
	{ id: 47648, name: 'Bang!', artist: 'AJR', youtubeId: 'sO9K7G9qUZc' },
	{ id: 27271, name: 'Welcome To New York', artist: 'Taylor Swift', youtubeId: 'L0N3C6DsisQ' },
	{ id: 7934, name: 'Blank Space', artist: 'Taylor Swift', youtubeId: 'e-ORhEE9VVg' },
	{ id: 10621, name: 'Style', artist: 'Taylor Swift', youtubeId: '-CmadmM5cOk' },
	{ id: 50778, name: 'Out of the Woods', artist: 'Taylor Swift', youtubeId: 'JLf9q36UsBk' },
	{
		id: 53148,
		name: 'All You Had To Do Was Stay',
		artist: 'Taylor Swift',
		youtubeId: 'MHFrXHQpHSQ'
	},
	{ id: 27554, name: 'Shake It Off', artist: 'Taylor Swift', youtubeId: 'nfWlot6h_JM' },
	{ id: 51830, name: 'I Wish You Would', artist: 'Taylor Swift', youtubeId: '5COhv5NabUI' },
	{ id: 56758, name: 'Bad Blood', artist: 'Taylor Swift', youtubeId: 'QcIy9NiNbmo' },
	{ id: 13412, name: 'Wildest Dreams', artist: 'Taylor Swift', youtubeId: 'IdneKLhsWOQ' },
	{ id: 58315, name: 'How You Get the Girl', artist: 'Taylor Swift', youtubeId: 'KjwTwvtwFlE' },
	{ id: 64300, name: 'This Love', artist: 'Taylor Swift', youtubeId: 'mvxQYPR4lmU' },
	{ id: 9405, name: 'I Know Places', artist: 'Taylor Swift', youtubeId: 'Rupz8tuap8I' },
	{ id: 27443, name: 'Clean', artist: 'Taylor Swift', youtubeId: 'IGmMW7JTvuw' },
	{ id: 34115, name: 'Colors / Dance', artist: 'George Winston', youtubeId: 'ZRf8Wi2VXfc' },
	{ id: 7779, name: 'Woods', artist: 'George Winston', youtubeId: '0GCeanyR71A' },
	{ id: 6449, name: 'Longing / Love', artist: 'George Winston', youtubeId: 'cv4VQ5r6g4Q' },
	{ id: 21344, name: 'Road', artist: 'George Winston', youtubeId: '4HMMarVWDB4' },
	{ id: 5429, name: 'Moon', artist: 'George Winston', youtubeId: 'YYzsra-zPsI' },
	{ id: 15202, name: 'Sea', artist: 'George Winston', youtubeId: 'Z5Snibuh7fk' },
	{ id: 16328, name: 'Beverly', artist: 'George Winston', youtubeId: 'GYU91hsxBWA' },
	{
		id: 35576,
		name: 'Freedom For The Stallion',
		artist: 'George Winston',
		youtubeId: 'FL1dqbj1v7g'
	},
	{
		id: 33659,
		name: 'Blues For Richard Folsom',
		artist: 'George Winston',
		youtubeId: 'fMTRZmQCyK8'
	},
	{ id: 61143, name: 'Hallelujah', artist: 'George Winston', youtubeId: 'rsuEoaFaGSQ' },
	{ id: 61289, name: 'Making A Way', artist: 'George Winston', youtubeId: 'MLFu7p1OjXo' },
	{ id: 54276, name: "He's A Runner", artist: 'George Winston', youtubeId: 'XZN2sZUxU8A' },
	{ id: 21991, name: 'Kai Forest', artist: 'George Winston', youtubeId: 'Tm8lAc41OyA' },
	{ id: 48898, name: 'Wahine Hololio', artist: 'George Winston', youtubeId: 'zfbmN-M636I' },
	{ id: 6342, name: 'At Midnight', artist: 'George Winston', youtubeId: '3Pox4z7beOc' },
	{
		id: 40724,
		name: 'Pua Sadinia (Not To Be Forgotten)',
		artist: 'George Winston',
		youtubeId: 'MkhLO0YvIBs'
	},
	{ id: 22648, name: 'Dawn', artist: 'George Winston', youtubeId: 'zrOWTl3_ZMw' },
	{
		id: 24314,
		name: 'Hana (A Flower For Your Heart)',
		artist: 'George Winston',
		youtubeId: 'fzY-wuWYNpw'
	},
	{ id: 42514, name: 'In the Flowers', artist: 'Animal Collective', youtubeId: 'fYEAflCO4Eo' },
	{ id: 6068, name: 'My Girls', artist: 'Animal Collective', youtubeId: 'zol2MJf6XNE' },
	{ id: 25145, name: 'Also Frightened', artist: 'Animal Collective', youtubeId: 'hN-Pu9SvthE' },
	{ id: 5618, name: 'Summertime Clothes', artist: 'Animal Collective', youtubeId: 'GxhaRgJUMl8' },
	{ id: 47850, name: 'Daily Routine', artist: 'Animal Collective', youtubeId: 'ig_DM4hlsiM' },
	{ id: 14900, name: 'Bluish', artist: 'Animal Collective', youtubeId: 'YTCg1Ovu64E' },
	{ id: 64102, name: 'Guys Eyes', artist: 'Animal Collective', youtubeId: 'XhtIIyvivSw' },
	{ id: 60549, name: 'Taste', artist: 'Animal Collective', youtubeId: 'pfdmRSfQ534' },
	{ id: 44007, name: 'Lion in a Coma', artist: 'Animal Collective', youtubeId: '536FRG8MeCc' },
	{ id: 2132, name: 'No More Runnin', artist: 'Animal Collective', youtubeId: '-qwPcl7nnL8' },
	{ id: 35235, name: 'Brother Sport', artist: 'Animal Collective', youtubeId: 'MGQjyGT1-mc' },
	{ id: 26243, name: 'Only Shallow', artist: 'my bloody valentine', youtubeId: 'nwfCoKNI5hs' },
	{ id: 53567, name: 'Loomer', artist: 'my bloody valentine', youtubeId: '3bwpoM1k50U' },
	{ id: 27542, name: 'Touched', artist: 'my bloody valentine', youtubeId: 'YvsEFuUmOdM' },
	{
		id: 15702,
		name: 'To Here Knows When',
		artist: 'my bloody valentine',
		youtubeId: 'PpXZAmeQDqY'
	},
	{ id: 24165, name: 'When You Sleep', artist: 'my bloody valentine', youtubeId: 'I-Ig71fhUc8' },
	{ id: 7709, name: 'I Only Said', artist: 'my bloody valentine', youtubeId: 'Zh6excugyG0' },
	{ id: 24161, name: 'Come In Alone', artist: 'my bloody valentine', youtubeId: 'aaSGSgW51uA' },
	{ id: 65070, name: 'Sometimes', artist: 'my bloody valentine', youtubeId: 'fH0NQzXlzyQ' },
	{ id: 14539, name: 'Blown a Wish', artist: 'my bloody valentine', youtubeId: 'L4XxzPaYMew' },
	{ id: 22850, name: 'What You Want', artist: 'my bloody valentine', youtubeId: 'OZVSnjG31PM' },
	{ id: 47636, name: 'Soon', artist: 'my bloody valentine', youtubeId: '1s0yma1HqHA' },
	{ id: 52546, name: '15 Step', artist: 'Radiohead', youtubeId: 'bgsmr7t8zGE' },
	{ id: 47227, name: 'Bodysnatchers', artist: 'Radiohead', youtubeId: 'nIQxhSvSRnQ' },
	{ id: 14214, name: 'Nude', artist: 'Radiohead', youtubeId: 'BbWBRnDK_AE' },
	{ id: 901, name: 'Weird Fishes / Arpeggi', artist: 'Radiohead', youtubeId: 'LUjGtyYEi90' },
	{ id: 17996, name: 'All I Need', artist: 'Radiohead', youtubeId: 'FM7ALFsOH4g' },
	{ id: 50909, name: 'Faust Arp', artist: 'Radiohead', youtubeId: 'PRc0iMRoIoc' },
	{ id: 14195, name: 'Reckoner', artist: 'Radiohead', youtubeId: '_uofQD-N6UI' },
	{ id: 26581, name: 'House of Cards', artist: 'Radiohead', youtubeId: '2yZBE5qLw8Y' },
	{ id: 32979, name: 'Jigsaw Falling Into Place', artist: 'Radiohead', youtubeId: 'CvjRlYpXS5U' },
	{ id: 41452, name: 'Videotape', artist: 'Radiohead', youtubeId: 'WF83_PR2EsA' },
	{ id: 61147, name: 'Heavy Vegetable - Still Moving', artist: 'farval', youtubeId: '-BFQiStRDiQ' },
	{ id: 54958, name: 'Heavy Vegetable - Cotton Swab', artist: 'farval', youtubeId: '9usgxbhl19c' },
	{
		id: 1279,
		name: 'Heavy Vegetable - Abducted by the Work Aliens',
		artist: 'farval',
		youtubeId: 'oi2MZRMJunY'
	},
	{ id: 57472, name: 'Heavy Vegetable - Crash', artist: 'farval', youtubeId: 'sDJ0P-KhCUk' },
	{ id: 64225, name: 'Heavy Vegetable - Poe', artist: 'farval', youtubeId: 'A0nxAWwzCI4' },
	{
		id: 50541,
		name: 'Heavy Vegetable - Song for Wesley',
		artist: 'farval',
		youtubeId: 'ruM0hOQ7_QA'
	},
	{ id: 34881, name: 'Heavy Vegetable - Sad Mud Song', artist: 'farval', youtubeId: 'Oz7Thc3qOTw' },
	{ id: 1861, name: 'Heavy Vegetable - Never Forget', artist: 'farval', youtubeId: 'uJdqZ1shKs0' },
	{ id: 15680, name: 'Heavy Vegetable - Intro', artist: 'farval', youtubeId: 'SZIo0MRjQxk' },
	{ id: 169, name: 'Heavy Vegetable - Bully', artist: 'farval', youtubeId: '8Iwz9SwDUAw' },
	{
		id: 55025,
		name: 'Heavy Vegetable - Tune Travis Tune',
		artist: 'farval',
		youtubeId: 'PCiz1PgJT7w'
	},
	{ id: 47349, name: 'Heavy Vegetable - On Purpose', artist: 'farval', youtubeId: 'QLz4RebafSw' },
	{ id: 11678, name: 'Heavy Vegetable - E/Or', artist: 'farval', youtubeId: 'OXEYixCydp4' },
	{ id: 21719, name: 'Heavy Vegetable - Mushroom Boy', artist: 'farval', youtubeId: 'OmFHdqmzA8Y' },
	{
		id: 19859,
		name: 'Heavy Vegetable - Henry Mancini Goes Surfing',
		artist: 'farval',
		youtubeId: 'fMKYIp8X_6Y'
	},
	{ id: 3421, name: 'Heavy Vegetable - I Owe You', artist: 'farval', youtubeId: 'i61IGwngLik' },
	{ id: 47892, name: 'Heavy Vegetable - Multiball', artist: 'farval', youtubeId: 'b8t9dhZmrfI' },
	{ id: 37011, name: 'Heavy Vegetable - Dental', artist: 'farval', youtubeId: 'yV-U1UYXzDY' },
	{ id: 8728, name: 'Heavy Vegetable - Daisy', artist: 'farval', youtubeId: 'opwaZrzUTVA' },
	{
		id: 53059,
		name: 'Heavy Vegetable - The Ducks at Ralphs',
		artist: 'farval',
		youtubeId: '-1xXSfzTh14'
	},
	{ id: 28897, name: 'Heavy Vegetable - Spatula', artist: 'farval', youtubeId: '8yyHcN1df5U' },
	{
		id: 18039,
		name: 'Heavy Vegetable - Jackie Chan Is a Punk Rocker',
		artist: 'farval',
		youtubeId: 'pUiEuJRGHXA'
	},
	{ id: 26573, name: 'Heavy Vegetable - Pine', artist: 'farval', youtubeId: 'VanUZfqubiU' },
	{ id: 53408, name: 'Heavy Vegetable - Fired', artist: 'farval', youtubeId: '8r9dx_fwQz8' },
	{ id: 45254, name: 'Heavy Vegetable - Tap', artist: 'farval', youtubeId: 'hg3Hyp39rZo' },
	{ id: 28237, name: 'Heavy Vegetable - Stop', artist: 'farval', youtubeId: 'TKBqZOzcbwQ' },
	{ id: 15986, name: 'Heavy Vegetable - Radio', artist: 'farval', youtubeId: '6ogBF2gk9QA' },
	{
		id: 62787,
		name: 'Heavy Vegetable - Going Steady With the Limes',
		artist: 'farval',
		youtubeId: 'GYvDgY2oMHA'
	},
	{
		id: 34583,
		name: 'Start Up - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'GC7W9PJkBTg'
	},
	{
		id: 39001,
		name: 'Title - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '3JjXAsIZEeM'
	},
	{
		id: 11966,
		name: 'Prologue - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'ZckCMgZ2Oi0'
	},
	{
		id: 16372,
		name: 'World 1 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '-c3D2H2ViRs'
	},
	{
		id: 20775,
		name: 'Super Bell Hill - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '6Y1FIR7x0So'
	},
	{
		id: 36989,
		name: 'Underground - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'IiHFf9lzvgs'
	},
	{
		id: 59221,
		name: 'Course Clear - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '4oZqKFQbgE0'
	},
	{
		id: 7902,
		name: 'Switch Scramble Circus - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'AG2yKllgGQM'
	},
	{
		id: 5731,
		name: 'Highway Showdown - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'k9oHHMHKsxg'
	},
	{
		id: 24268,
		name: 'World Clear - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'DfxLeGxBeG4'
	},
	{
		id: 62650,
		name: 'To the Next World - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'etPI3Q69TVU'
	},
	{
		id: 57303,
		name: 'World 2 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'U-NsR4ldNRw'
	},
	{
		id: 33980,
		name: 'Conkdor Canyon - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'x1IXLCRUJUc'
	},
	{
		id: 14472,
		name: 'Inside the Mystery House - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'McDoa9TR3Qw'
	},
	{
		id: 55618,
		name: 'Mystery House Melee - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'D9gCNvTht-o'
	},
	{
		id: 57887,
		name: 'Shifty Boo Mansion - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'CsF5_5kQjlI'
	},
	{
		id: 56230,
		name: 'World 3 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'vAVIT-8xUoo'
	},
	{
		id: 29871,
		name: 'Captain Toad Goes Forth - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'bmzd_2ZGDz8'
	},
	{
		id: 29744,
		name: 'Boom Boom - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'PfBUrEEtQQ0'
	},
	{
		id: 21972,
		name: 'Snowball Park - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'Z62sg_k-ccc'
	},
	{
		id: 6702,
		name: 'Mount Must Dash - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'VR38WpXuLms'
	},
	{
		id: 15133,
		name: 'Athletic - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '9b6evbucP4w'
	},
	{
		id: 63455,
		name: 'Color Panel Challenge - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'WUwqgJaqjOk'
	},
	{
		id: 56464,
		name: 'Panel de Mario - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'onUh0c15bGU'
	},
	{
		id: 41163,
		name: 'Pre-Battle - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'uHiz0uGZwzA'
	},
	{
		id: 40049,
		name: 'Hisstocrat - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'G3IiUMuzg3s'
	},
	{
		id: 1057,
		name: 'World 4 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'WCeL8MsB-DA'
	},
	{
		id: 38919,
		name: 'Sprawling Savanna - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'fs3JrvVEYeU'
	},
	{
		id: 12372,
		name: 'Beep Block Skyway - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '0iKXUogFJg8'
	},
	{
		id: 35778,
		name: 'Fuzzy Time Mine - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'vwnjTV3tdtI'
	},
	{
		id: 5878,
		name: "Sprixies' Theme - Super Mario 3D World",
		artist: 'Video Games Music',
		youtubeId: '-DZjwG9PKxU'
	},
	{
		id: 44166,
		name: 'World 5 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'VeVbMsXG6bM'
	},
	{
		id: 65087,
		name: 'Sunshine Seaside - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'XW7Tdm1Pu38'
	},
	{
		id: 56533,
		name: 'Double Cherry Pass - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'taJRNHTpRvM'
	},
	{
		id: 12512,
		name: 'Super Star - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'Vzvezoq4YPU'
	},
	{
		id: 173,
		name: 'Footlight Lane - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'cQdDXYIDlNY'
	},
	{
		id: 15790,
		name: 'The Bullet Bill Express - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'iE-CfMOU7xM'
	},
	{
		id: 25819,
		name: 'World 6 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'gRNqEpdsVlg'
	},
	{
		id: 50088,
		name: 'Toad House - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'uFSZVa93kmg'
	},
	{
		id: 45873,
		name: 'Hands-On Hall - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'PK57TYZ_9Bc'
	},
	{
		id: 40553,
		name: 'Captain Toad Plays Peek-a-Boo - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'zWv050YPFNQ'
	},
	{
		id: 39048,
		name: 'Green Stars Collected - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'ulGV1AKNSYM'
	},
	{
		id: 18717,
		name: 'Motley Bossblob - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '-XkWBUF5bX8'
	},
	{
		id: 15375,
		name: 'World Castle - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'MremYkPKeoo'
	},
	{
		id: 54717,
		name: 'Fort Fire Bros. - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'IxUgsds5GF0'
	},
	{
		id: 58472,
		name: 'Simmering Lava Lake - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'MiotO4xWHOA'
	},
	{
		id: 56461,
		name: 'The Bullet Bill Brigade - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'GX_Qy2wHaPE'
	},
	{
		id: 500,
		name: "Bowser's Lava Lake Keep - Super Mario 3D World",
		artist: 'Video Games Music',
		youtubeId: 'jVRVMl4z6u8'
	},
	{
		id: 62552,
		name: 'Bowser Land - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '1A5ReN6WPPw'
	},
	{
		id: 29238,
		name: 'Pom Pom - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'ZCpNWX_Prk4'
	},
	{ id: 61295, name: 'Prelude', artist: 'YouTube', youtubeId: 'Eiz8nmCYVy0' },
	{
		id: 31032,
		name: "A Salesman's Guide to Non-Existence",
		artist: 'YouTube',
		youtubeId: 'qfh51HrD5U4'
	},
	{ id: 40484, name: 'Feed the Horses', artist: 'YouTube', youtubeId: '_d422vNui-s' },
	{ id: 17420, name: 'Blood on the Radio', artist: 'YouTube', youtubeId: 'XmKuMTUOefg' },
	{ id: 15703, name: 'Absentee', artist: 'YouTube', youtubeId: 'g3TSwJfoqUw' },
	{ id: 54189, name: 'Suspicious Waveforms', artist: 'YouTube', youtubeId: 'NIc8gvIBi_4' },
	{ id: 26058, name: 'Carnival', artist: 'YouTube', youtubeId: '6BT8tBwLdtc' },
	{ id: 8796, name: 'Concrete Swan Dive', artist: 'YouTube', youtubeId: '4kSpHiVKd-M' },
	{ id: 6602, name: 'In The Company of Worms', artist: 'YouTube', youtubeId: '4VCHVDQXbkU' },
	{ id: 6744, name: 'My Famed Disappearing Act', artist: 'YouTube', youtubeId: 'OR8y2PrBMQc' },
	{
		id: 59409,
		name: 'Start Screen - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'E2U5GoX4dew'
	},
	{
		id: 56349,
		name: 'Main Menu - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'bCOuXEbBfS8'
	},
	{
		id: 7683,
		name: 'Mario Kart Stadium - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'LMuFA_XBtWk'
	},
	{
		id: 1585,
		name: 'Water Park - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'DRgH8gYF-W4'
	},
	{
		id: 62580,
		name: 'Sweet Sweet Canyon - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'ZExzZ_vs09E'
	},
	{
		id: 31218,
		name: 'Thwomp Ruins - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'yCYUkablczI'
	},
	{
		id: 23222,
		name: 'Mario Circuit - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'QiqGbH0LeAc'
	},
	{
		id: 30785,
		name: 'Toad Harbor - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'YEpbMGxQTVQ'
	},
	{
		id: 51250,
		name: 'Twisted Mansion - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'fJxCiIa8N3Q'
	},
	{
		id: 46745,
		name: 'Shy Guy Falls - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'SwKVi97b9ig'
	},
	{
		id: 7488,
		name: 'Shy Guy Falls (Miner)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'TNzxmt01ScY'
	},
	{
		id: 26813,
		name: 'Sunshine Airport - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: '6-jEAJRppMg'
	},
	{
		id: 30209,
		name: 'Dolphin Shoals - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'dtf3IYNgkS8'
	},
	{
		id: 1802,
		name: 'Dolphin Shoals (Shallow Water)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'pNXWy5i4xAo'
	},
	{
		id: 53659,
		name: 'Dolphin Shoals (Deep Water)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'EaKulDcXYKU'
	},
	{
		id: 53506,
		name: 'Electrodrome - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'RVXzZ760XA8'
	},
	{
		id: 63954,
		name: 'Electrodrome (Anti-Gravity Stripe)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: '4wG-95NSLIc'
	},
	{
		id: 20186,
		name: 'Mount Wario (Medley) - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'MBBTr_dlma8'
	},
	{
		id: 18254,
		name: 'Cloudtop Cruise - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 't1771Qo2CU8'
	},
	{
		id: 33443,
		name: 'Cloudtop Cruise (Thundercloud)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'DPfu-TFseAw'
	},
	{
		id: 60123,
		name: 'Bone Dry Dunes - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'PbSbjytgnWQ'
	},
	{
		id: 8017,
		name: "Bowser's Castle - Mario Kart 8 Deluxe OST",
		artist: "Dave's OSTs",
		youtubeId: 'MDhG8I9Bhdg'
	},
	{
		id: 61836,
		name: 'Rainbow Road - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'WriO4Erm66Y'
	},
	{
		id: 30343,
		name: 'Wii Moo Moo Meadows - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'zr7IdsRl9rk'
	},
	{
		id: 37382,
		name: 'GBA Mario Circuit - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'Xj3tZp5WH_U'
	},
	{
		id: 10793,
		name: 'DS Cheep Cheep Beach - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'Sz1mXdMvaNk'
	},
	{
		id: 35519,
		name: "N64 Toad's Turnpike - Mario Kart 8 Deluxe OST",
		artist: "Dave's OSTs",
		youtubeId: 'NXXLlLovKcc'
	},
	{
		id: 34827,
		name: 'GCN Dry Dry Desert - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'G7xjAG2piq8'
	},
	{
		id: 40246,
		name: 'SNES Donut Plains 3 - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'VPkKs0ov678'
	},
	{
		id: 51639,
		name: 'N64 Royal Raceway - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'H7P6F0n4gVQ'
	},
	{
		id: 5667,
		name: '3DS DK Jungle - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: '8n2f8e7XCSs'
	},
	{
		id: 35436,
		name: 'DS Wario Stadium / DS Waluigi Pinball - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'GdaX5iX0ZaU'
	},
	{
		id: 34505,
		name: 'GCN Sherbet Land - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'nLhNtWMfD0E'
	},
	{
		id: 56590,
		name: '3DS Music Park - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'l-cKqYgijTM'
	},
	{
		id: 22834,
		name: '3DS Music Park (Piano)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'WyPQkSvcG40'
	},
	{
		id: 51977,
		name: '3DS Music Park (Xylophone)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'hiibU7wNOcs'
	},
	{
		id: 57032,
		name: '3DS Music Park (Chimes)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'tG7cMVh3V5U'
	},
	{
		id: 16511,
		name: '3DS Music Park (Jumping Notes)- Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'KIEa9eQF4OU'
	},
	{
		id: 55826,
		name: 'N64 Yoshi Valley - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'ZrLOHnLnAzM'
	},
	{
		id: 25044,
		name: 'DS Tick-Tock Clock - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'Qnr8baUmOUY'
	},
	{
		id: 44892,
		name: '3DS Piranha Plant Slide - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'N2nfrW9PH1k'
	},
	{
		id: 26566,
		name: 'Wii Grumble Volcano - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'UBTLinvaMwc'
	},
	{
		id: 48494,
		name: 'N64 Rainbow Road - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'NuG53TOJqlo'
	},
	{
		id: 12893,
		name: 'GCN Yoshi Circuit - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'MpXqPFtEpDE'
	},
	{
		id: 41432,
		name: 'Excitebike Arena - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'U-CfGdYcKLQ'
	},
	{
		id: 2040,
		name: 'Dragon Driftway - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'AWc_PbH1cCM'
	},
	{
		id: 60499,
		name: 'Mute City - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: '-yW4CMjpeNk'
	},
	{
		id: 20127,
		name: "Wii Wario's Goldmine - Mario Kart 8 Deluxe OST",
		artist: "Dave's OSTs",
		youtubeId: 'gBdo_XH--io'
	},
	{
		id: 16126,
		name: "Wii Wario's Goldmine (Miner)- Mario Kart 8 Deluxe OST",
		artist: "Dave's OSTs",
		youtubeId: 'GAt0Wd-yYu4'
	},
	{
		id: 17509,
		name: 'SNES Rainbow Road - Mario Kart 8 Deluxe OST',
		artist: "Dave's OSTs",
		youtubeId: 'O3cZH0TfT_o'
	},
	{
		id: 19429,
		name: 'Jump Up, Super Star! - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '5tzK1AdloeQ'
	},
	{
		id: 18973,
		name: 'Bonneton - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'NRJraDW_hXY'
	},
	{
		id: 64726,
		name: 'Fossil Falls - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'A-wkCRSKt38'
	},
	{
		id: 300,
		name: 'Fossil Falls [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'euoWrznC28E'
	},
	{
		id: 33756,
		name: 'Fossil Falls: Dinosaur - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'u5kUBV2SJ_4'
	},
	{
		id: 34631,
		name: 'Tostarena: Ruins - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '_BlR82H9Cl4'
	},
	{
		id: 43859,
		name: 'Tostarena: Ruins [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8BJSbyNAmUA'
	},
	{
		id: 2990,
		name: 'Tostarena: Night - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Dz1jxNcFeNI'
	},
	{
		id: 21708,
		name: 'Tostarena: Night [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'R_YNN60-Dvk'
	},
	{
		id: 36731,
		name: 'Tostarena: Town - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'ZXjCEqA2NZA'
	},
	{
		id: 18953,
		name: 'Tostarena: Jaxi - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Jl1nsegCC3M'
	},
	{
		id: 31083,
		name: 'Steam Gardens - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'ZHa71Pfgfi0'
	},
	{
		id: 9143,
		name: 'Steam Gardens [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'mfBPka8ny0c'
	},
	{
		id: 24580,
		name: 'Steam Gardens: Sherm - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8AwnuwJfDTQ'
	},
	{
		id: 10620,
		name: 'Lake Lamode 1 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'ZTBKNvFiy30'
	},
	{
		id: 27421,
		name: 'Lake Lamode 1 [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '_E5fPGdbdHk'
	},
	{
		id: 63490,
		name: 'Lake Lamode 2 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '5im8cCPz83M'
	},
	{
		id: 7289,
		name: 'Lake Lamode: Underwater Passage - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'fnWo8NaFpsw'
	},
	{
		id: 58224,
		name: 'Forgotten Isle 1 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'oVCvPGj5lW8'
	},
	{
		id: 634,
		name: 'Forgotten Isle 2 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '36SFtMkIiwA'
	},
	{
		id: 27480,
		name: 'Forgotten Isle 2 [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'GRb6tO6iohQ'
	},
	{
		id: 15375,
		name: 'New Donk City: Night 1 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'PVl1DcOSINo'
	},
	{
		id: 45836,
		name: 'New Donk City: Night 2 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'OJv9_ASE9TY'
	},
	{
		id: 37627,
		name: 'New Donk City: Daytime - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'fS3NlqcHvdM'
	},
	{
		id: 32882,
		name: 'New Donk City: Cafe - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Wp0wKxCcYjE'
	},
	{
		id: 28431,
		name: 'New Donk City [Band Performance] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'uvYisRsmEnI'
	},
	{
		id: 14336,
		name: 'New Donk City: Festival - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '7ZtycdD2Ea8'
	},
	{
		id: 46517,
		name: 'New Donk City: Festival [Japanese] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'S9lozN8RWXQ'
	},
	{
		id: 10130,
		name: 'New Donk City: Festival [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Gpr4EgZhdtc'
	},
	{
		id: 41821,
		name: 'Bubblaine - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '2GqvFXkBcts'
	},
	{
		id: 1229,
		name: 'Bubblaine: Underwater - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'OKU8oizSbkg'
	},
	{
		id: 42654,
		name: 'Bubblaine [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'gElZ_j9G4C8'
	},
	{
		id: 35905,
		name: 'Shiveria: Town - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '7tOGGtEigOQ'
	},
	{
		id: 10475,
		name: 'Shiveria: Race-Course Entrance - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'v8sMaV0oKWU'
	},
	{
		id: 24004,
		name: 'Mount Volbono - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'iC2OtOrnJtE'
	},
	{
		id: 48696,
		name: 'Mount Volbono [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'FPMJu9SLWA8'
	},
	{
		id: 4612,
		name: 'Mount Volbono: Town - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8A7aShXGSuc'
	},
	{
		id: 34023,
		name: "Bowser's Castle 1 - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'J9P0RavATkw'
	},
	{
		id: 5497,
		name: "Bowser's Castle 1 [8 Bit] - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'DWvy-sD-anc'
	},
	{
		id: 24952,
		name: "Bowser's Castle 2 - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'Um_4-yUPmsg'
	},
	{
		id: 22490,
		name: 'Honeylune Ridge - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'MO5R8q8FLJ8'
	},
	{
		id: 41405,
		name: 'Honeylune Ridge [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '6zN5H0WAxTU'
	},
	{
		id: 8941,
		name: 'Honeylune Ridge: Caves - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8zg3xhmUmkg'
	},
	{
		id: 47838,
		name: 'Honeylune Ridge: Wedding Hall - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Y2cpwOYwEec'
	},
	{
		id: 41071,
		name: 'Honeylune Ridge: Collapse - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Ny_TVOCFDoA'
	},
	{
		id: 14002,
		name: 'Honeylune Ridge: Collapse [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Bz-ylxpnGLY'
	},
	{
		id: 35843,
		name: 'Honeylune Ridge: Escape - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'PL5gUgFJ6o8'
	},
	{
		id: 28686,
		name: 'Honeylune Ridge: Escape [Japanese] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '2pNQnkBkBTE'
	},
	{
		id: 18528,
		name: 'Honeylune Ridge Escape [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '6edftQ28Y8E'
	},
	{
		id: 30559,
		name: "Peach's Castle - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'nX_R2CxSbTI'
	},
	{
		id: 42261,
		name: 'Jump Up, Super Star! - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '5tzK1AdloeQ'
	},
	{
		id: 19625,
		name: 'Bonneton - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'NRJraDW_hXY'
	},
	{
		id: 63151,
		name: 'Fossil Falls - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'A-wkCRSKt38'
	},
	{
		id: 45609,
		name: 'Fossil Falls [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'euoWrznC28E'
	},
	{
		id: 6971,
		name: 'Fossil Falls: Dinosaur - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'u5kUBV2SJ_4'
	},
	{
		id: 22901,
		name: 'Tostarena: Ruins - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '_BlR82H9Cl4'
	},
	{
		id: 39340,
		name: 'Tostarena: Ruins [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8BJSbyNAmUA'
	},
	{
		id: 56810,
		name: 'Tostarena: Night - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Dz1jxNcFeNI'
	},
	{
		id: 46035,
		name: 'Tostarena: Night [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'R_YNN60-Dvk'
	},
	{
		id: 62310,
		name: 'Tostarena: Town - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'ZXjCEqA2NZA'
	},
	{
		id: 35236,
		name: 'Tostarena: Jaxi - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Jl1nsegCC3M'
	},
	{
		id: 54330,
		name: 'Steam Gardens - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'ZHa71Pfgfi0'
	},
	{
		id: 10799,
		name: 'Steam Gardens [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'mfBPka8ny0c'
	},
	{
		id: 111,
		name: 'Steam Gardens: Sherm - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8AwnuwJfDTQ'
	},
	{
		id: 55936,
		name: 'Lake Lamode 1 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'ZTBKNvFiy30'
	},
	{
		id: 37910,
		name: 'Lake Lamode 1 [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '_E5fPGdbdHk'
	},
	{
		id: 39310,
		name: 'Lake Lamode 2 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '5im8cCPz83M'
	},
	{
		id: 35172,
		name: 'Lake Lamode: Underwater Passage - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'fnWo8NaFpsw'
	},
	{
		id: 25764,
		name: 'Forgotten Isle 1 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'oVCvPGj5lW8'
	},
	{
		id: 57304,
		name: 'Forgotten Isle 2 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '36SFtMkIiwA'
	},
	{
		id: 44204,
		name: 'Forgotten Isle 2 [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'GRb6tO6iohQ'
	},
	{
		id: 64141,
		name: 'New Donk City: Night 1 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'PVl1DcOSINo'
	},
	{
		id: 21438,
		name: 'New Donk City: Night 2 - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'OJv9_ASE9TY'
	},
	{
		id: 3758,
		name: 'New Donk City: Daytime - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'fS3NlqcHvdM'
	},
	{
		id: 40,
		name: 'New Donk City: Cafe - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Wp0wKxCcYjE'
	},
	{
		id: 16030,
		name: 'New Donk City [Band Performance] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'uvYisRsmEnI'
	},
	{
		id: 1379,
		name: 'New Donk City: Festival - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '7ZtycdD2Ea8'
	},
	{
		id: 19562,
		name: 'New Donk City: Festival [Japanese] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'S9lozN8RWXQ'
	},
	{
		id: 52168,
		name: 'New Donk City: Festival [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Gpr4EgZhdtc'
	},
	{
		id: 44346,
		name: 'Bubblaine - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '2GqvFXkBcts'
	},
	{
		id: 35671,
		name: 'Bubblaine: Underwater - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'OKU8oizSbkg'
	},
	{
		id: 61971,
		name: 'Bubblaine [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'gElZ_j9G4C8'
	},
	{
		id: 41177,
		name: 'Shiveria: Town - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '7tOGGtEigOQ'
	},
	{
		id: 5057,
		name: 'Shiveria: Race-Course Entrance - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'v8sMaV0oKWU'
	},
	{
		id: 45772,
		name: 'Mount Volbono - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'iC2OtOrnJtE'
	},
	{
		id: 1574,
		name: 'Mount Volbono [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'FPMJu9SLWA8'
	},
	{
		id: 8228,
		name: 'Mount Volbono: Town - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8A7aShXGSuc'
	},
	{
		id: 2603,
		name: "Bowser's Castle 1 - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'J9P0RavATkw'
	},
	{
		id: 9572,
		name: "Bowser's Castle 1 [8 Bit] - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'DWvy-sD-anc'
	},
	{
		id: 36805,
		name: "Bowser's Castle 2 - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'Um_4-yUPmsg'
	},
	{
		id: 40003,
		name: 'Honeylune Ridge - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'MO5R8q8FLJ8'
	},
	{
		id: 27624,
		name: 'Honeylune Ridge [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '6zN5H0WAxTU'
	},
	{
		id: 55393,
		name: 'Honeylune Ridge: Caves - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '8zg3xhmUmkg'
	},
	{
		id: 39166,
		name: 'Honeylune Ridge: Wedding Hall - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Y2cpwOYwEec'
	},
	{
		id: 46026,
		name: 'Honeylune Ridge: Collapse - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Ny_TVOCFDoA'
	},
	{
		id: 11280,
		name: 'Honeylune Ridge: Collapse [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'Bz-ylxpnGLY'
	},
	{
		id: 47961,
		name: 'Honeylune Ridge: Escape - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: 'PL5gUgFJ6o8'
	},
	{
		id: 26986,
		name: 'Honeylune Ridge: Escape [Japanese] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '2pNQnkBkBTE'
	},
	{
		id: 8184,
		name: 'Honeylune Ridge Escape [8 Bit] - Super Mario Odyssey',
		artist: 'Video Games Music',
		youtubeId: '6edftQ28Y8E'
	},
	{
		id: 30596,
		name: "Peach's Castle - Super Mario Odyssey",
		artist: 'Video Games Music',
		youtubeId: 'nX_R2CxSbTI'
	},
	{
		id: 35214,
		name: 'Start Up - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'GC7W9PJkBTg'
	},
	{
		id: 26391,
		name: 'Title - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '3JjXAsIZEeM'
	},
	{
		id: 2150,
		name: 'Prologue - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'ZckCMgZ2Oi0'
	},
	{
		id: 5530,
		name: 'World 1 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '-c3D2H2ViRs'
	},
	{
		id: 22353,
		name: 'Super Bell Hill - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '6Y1FIR7x0So'
	},
	{
		id: 47709,
		name: 'Underground - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'IiHFf9lzvgs'
	},
	{
		id: 12078,
		name: 'Course Clear - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '4oZqKFQbgE0'
	},
	{
		id: 64059,
		name: 'Switch Scramble Circus - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'AG2yKllgGQM'
	},
	{
		id: 12236,
		name: 'Highway Showdown - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'k9oHHMHKsxg'
	},
	{
		id: 51170,
		name: 'World Clear - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'DfxLeGxBeG4'
	},
	{
		id: 55883,
		name: 'To the Next World - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'etPI3Q69TVU'
	},
	{
		id: 15076,
		name: 'World 2 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'U-NsR4ldNRw'
	},
	{
		id: 57004,
		name: 'Conkdor Canyon - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'x1IXLCRUJUc'
	},
	{
		id: 57482,
		name: 'Inside the Mystery House - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'McDoa9TR3Qw'
	},
	{
		id: 64589,
		name: 'Mystery House Melee - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'D9gCNvTht-o'
	},
	{
		id: 19449,
		name: 'Shifty Boo Mansion - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'CsF5_5kQjlI'
	},
	{
		id: 30839,
		name: 'World 3 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'vAVIT-8xUoo'
	},
	{
		id: 49206,
		name: 'Captain Toad Goes Forth - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'bmzd_2ZGDz8'
	},
	{
		id: 37666,
		name: 'Boom Boom - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'PfBUrEEtQQ0'
	},
	{
		id: 8291,
		name: 'Snowball Park - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'Z62sg_k-ccc'
	},
	{
		id: 49763,
		name: 'Mount Must Dash - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'VR38WpXuLms'
	},
	{
		id: 56610,
		name: 'Athletic - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '9b6evbucP4w'
	},
	{
		id: 26916,
		name: 'Color Panel Challenge - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'WUwqgJaqjOk'
	},
	{
		id: 2298,
		name: 'Panel de Mario - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'onUh0c15bGU'
	},
	{
		id: 42472,
		name: 'Pre-Battle - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'uHiz0uGZwzA'
	},
	{
		id: 35474,
		name: 'Hisstocrat - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'G3IiUMuzg3s'
	},
	{
		id: 24566,
		name: 'World 4 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'WCeL8MsB-DA'
	},
	{
		id: 64393,
		name: 'Sprawling Savanna - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'fs3JrvVEYeU'
	},
	{
		id: 54608,
		name: 'Beep Block Skyway - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '0iKXUogFJg8'
	},
	{
		id: 49587,
		name: 'Fuzzy Time Mine - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'vwnjTV3tdtI'
	},
	{
		id: 63939,
		name: "Sprixies' Theme - Super Mario 3D World",
		artist: 'Video Games Music',
		youtubeId: '-DZjwG9PKxU'
	},
	{
		id: 62467,
		name: 'World 5 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'VeVbMsXG6bM'
	},
	{
		id: 58393,
		name: 'Sunshine Seaside - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'XW7Tdm1Pu38'
	},
	{
		id: 20025,
		name: 'Double Cherry Pass - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'taJRNHTpRvM'
	},
	{
		id: 4104,
		name: 'Super Star - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'Vzvezoq4YPU'
	},
	{
		id: 8130,
		name: 'Footlight Lane - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'cQdDXYIDlNY'
	},
	{
		id: 10232,
		name: 'The Bullet Bill Express - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'iE-CfMOU7xM'
	},
	{
		id: 4623,
		name: 'World 6 - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'gRNqEpdsVlg'
	},
	{
		id: 54164,
		name: 'Toad House - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'uFSZVa93kmg'
	},
	{
		id: 34184,
		name: 'Hands-On Hall - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'PK57TYZ_9Bc'
	},
	{
		id: 3300,
		name: 'Captain Toad Plays Peek-a-Boo - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'zWv050YPFNQ'
	},
	{
		id: 18081,
		name: 'Green Stars Collected - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'ulGV1AKNSYM'
	},
	{
		id: 46442,
		name: 'Motley Bossblob - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '-XkWBUF5bX8'
	},
	{
		id: 9996,
		name: 'World Castle - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'MremYkPKeoo'
	},
	{
		id: 26100,
		name: 'Fort Fire Bros. - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'IxUgsds5GF0'
	},
	{
		id: 19173,
		name: 'Simmering Lava Lake - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'MiotO4xWHOA'
	},
	{
		id: 13385,
		name: 'The Bullet Bill Brigade - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'GX_Qy2wHaPE'
	},
	{
		id: 63706,
		name: "Bowser's Lava Lake Keep - Super Mario 3D World",
		artist: 'Video Games Music',
		youtubeId: 'jVRVMl4z6u8'
	},
	{
		id: 22613,
		name: 'Bowser Land - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: '1A5ReN6WPPw'
	},
	{
		id: 57879,
		name: 'Pom Pom - Super Mario 3D World',
		artist: 'Video Games Music',
		youtubeId: 'ZCpNWX_Prk4'
	}
];

export const demoPositions: Record<number, Position> = {
	'1735': { x: 2309.036797793888, y: 1974.967766109447 },
	'1811': { x: 4083.818295547644, y: 2765.436770468833 },
	'3850': { x: 4883.998559533442, y: 1997.658719400034 },
	'4397': { x: 4144.383650411677, y: 2209.297415117149 },
	'4493': { x: 5781.5651616307205, y: 1173.0832419614824 },
	'4692': { x: 4004.589861653165, y: 663.8008628022043 },
	'5222': { x: 5373.958477554026, y: 2735.8229835327757 },
	'7666': { x: 3949.864622682103, y: 1971.5130686830057 },
	'8745': { x: 2898.7012590966997, y: 480.4390654862277 },
	'9029': { x: 1396.8948388401056, y: 400.4804431116665 },
	'10166': { x: 2642.958477554138, y: 2488.489650199381 },
	'13345': { x: 2936.205684329645, y: 864.2668035787766 },
	'14351': { x: 4441.556334660527, y: 2680.29363634554 },
	'14557': { x: 2405.285838417163, y: 1151.911551007465 },
	'16966': { x: 4178.063206519603, y: 2464.966827291338 },
	'17815': { x: 3760.575631966002, y: 1832.2800355424138 },
	'19432': { x: 2769.9710772288026, y: 1274.9561186200624 },
	'21687': { x: 1900.02223303618, y: 2684.925259473289 },
	'22132': { x: 3821.1243773934866, y: 2667.315481347082 },
	'23054': { x: 2649.2076257565213, y: 948.0218684931093 },
	'23358': { x: 3217.8763422951097, y: 3229.4059235572677 },
	'25338': { x: 4064.8342076669014, y: 966.3949724070259 },
	'25477': { x: 4330.996146615738, y: 2973.862753500376 },
	'26708': { x: 4788.552230083266, y: 2924.31337418804 },
	'28577': { x: 3395.8418108874475, y: 591.5396501993849 },
	'29764': { x: 4868.663030867637, y: 2595.726708357316 },
	'31254': { x: 1497.36252733908, y: 1660.9121826469336 },
	'31273': { x: 1766.0478432709285, y: 574.3516525715354 },
	'31346': { x: 3869.0961761991884, y: 2377.52993039477 },
	'31375': { x: 3748.52858627737, y: 495.2293849329696 },
	'32981': { x: 3557.5078669754157, y: 2883.0410301029287 },
	'33760': { x: 2909.2183657579017, y: 2584.699924599189 },
	'33931': { x: 1304.0721772991762, y: 2320.625791689241 },
	'35124': { x: 2512.958477554159, y: 1737.822983532726 },
	'36087': { x: 1922.8186579566616, y: 2152.60481375448 },
	'36303': { x: 4069.4886916191044, y: 1520.0860503596862 },
	'37943': { x: 3566.5906253391086, y: 3293.012126126494 },
	'39124': { x: 5696.291810887609, y: 2521.489650199439 },
	'39849': { x: 2395.7096714341824, y: 2665.968991551107 },
	'40882': { x: 3739.0905617510825, y: 805.5089635682808 },
	'42405': { x: 3602.280830871826, y: 2128.8397134826428 },
	'44504': { x: 4865.758960080199, y: 2343.3390559150084 },
	'45456': { x: 3614.013513458044, y: 1525.8061394933568 },
	'46265': { x: 4394.810001674442, y: 790.5201780285417 },
	'46443': { x: 2234.411019489351, y: 2413.438580110834 },
	'47983': { x: 3593.041772843123, y: 1770.2721608541287 },
	'48173': { x: 5275.482426218483, y: 1670.0897708028415 },
	'50157': { x: 1413.013871106037, y: 718.7355703684725 },
	'51915': { x: 3145.3910743771567, y: 2364.1443470484887 },
	'52040': { x: 3490.763915293647, y: 341.79508964042236 },
	'52419': { x: 3136.802192945005, y: 2114.5316729403366 },
	'54113': { x: 3058.3655824300376, y: 1172.9709262747226 },
	'54699': { x: 4573.773845594775, y: 2398.0254302482263 },
	'55152': { x: 4233.291810887369, y: 459.4896501993885 },
	'55966': { x: 2799.5371759199197, y: 1990.3815229468496 },
	'58207': { x: 5474.72661433197, y: 2382.6269644293625 },
	'58216': { x: 4587.432804152521, y: 512.528785806961 },
	'59519': { x: 5348.944108887792, y: 2000.6410716432392 },
	'60461': { x: 2588.790177295232, y: 2217.4717640762224 },
	'61240': { x: 5639.350964673553, y: 2135.9803945688054 },
	'61766': { x: 5115.686847218207, y: 2223.9750525527024 },
	'61949': { x: 2906.0089493754067, y: 2282.7632572341226 },
	'62346': { x: 5617.7890474780415, y: 1755.7329253738953 },
	'62369': { x: 4919.857401474988, y: 761.7911486199837 },
	'63421': { x: 872.7582144761435, y: 492.0722652407713 },
	'63465': { x: 3389.8315037718357, y: 2573.431054377808 },
	'65322': { x: 5238.958477554077, y: 2495.48965019941 },
	'5611612': { x: 3813.8852410868985, y: 2027.1915054534059 },
	'65615363': { x: 1043.1450351529472, y: 744.4150156241225 },
	'65615441': { x: 4729.691442637416, y: 856.9356914998892 },
	'80456409': { x: 4748.071934669, y: 652.9356788055428 },
	'209388277': { x: 4587.477245680255, y: 1819.8328441072053 },
	'264720008': { x: 2696.654867284061, y: 179.08183447138254 },
	'266376953': { x: 4422.85289533868, y: 2066.479413967763 },
	'275965256': { x: 4813.1264402882925, y: 327.9022505021942 },
	'336431190': { x: 4063.8131282249187, y: 1907.8275020911053 },
	'342123548': { x: 3181.4180918940715, y: 143.3420997378022 },
	'363353526': { x: 2687.216842757781, y: 489.36141310668637 },
	'387239482': { x: 2006.4918634367427, y: 856.8233758131308 },
	'509665145': { x: 2337.9577847785363, y: 2257.2835039162005 },
	'528437411': { x: 4466.535361829052, y: 527.2659633785155 },
	'590431785': { x: 4602.310342280232, y: 694.7085747045267 },
	'716192666': { x: 1119.6722479133816, y: 1194.9103564072022 },
	'800092985': { x: 4187.084758560792, y: 2179.3420997378043 },
	'850571319': { x: 1846.8275401034018, y: 164.2915150246416 },
	'974485462': { x: 2562.139794464743, y: 1209.658589031756 },
	'991509751': { x: 4297.070389894521, y: 1684.4935211816382 },
	'991510292': { x: 4223.608707225203, y: 1353.9422203412487 },
	'992221994': { x: 4565.9153284847425, y: 1439.585374912298 },
	'1050385377': { x: 4633.409164499375, y: 534.3791417309619 },
	'1050385387': { x: 4619.35160476551, y: 354.6688675035633 },
	'1058904300': { x: 2952.716142659852, y: 347.653312340613 },
	'1065974932': { x: 3816.789311874334, y: 2279.5791578957073 },
	'1065975633': { x: 4322.084758560748, y: 2419.675433071168 },
	'1065976549': { x: 3736.678511089965, y: 2608.1658237264332 },
	'1088595729': { x: 3342.936282681144, y: 474.3726275669478 },
	'1097861387': { x: 3389.682615667225, y: 2364.1460858839314 },
	'1097862703': { x: 2817.22245720587, y: 2061.38237993317 },
	'1097862870': { x: 3126.1894875263065, y: 2148.8192768297363 },
	'1097863576': { x: 3031.944576554344, y: 2449.289220007224 },
	'1107075189': { x: 1884.3319653363453, y: 548.1192531171827 },
	'1107175119': { x: 1597.3339067632305, y: 631.8743180315155 },
	'1109714965': { x: 2769.2506584001762, y: 2351.1679308854777 },
	'1111577743': { x: 2505.6341479821203, y: 2566.893479641322 },
	'1111778836': { x: 3535.5590851592224, y: 196.38123534537354 },
	'1151001410': { x: 3537.2926484943714, y: 595.5766906385784 },
	'1200868601': { x: 3017.6149726257945, y: 1203.9384998980863 },
	'1252758311': { x: 1914.7514252274889, y: 1567.6754330711474 },
	'1334814526': { x: 3012.960488673596, y: 650.2474219454316 },
	'1334814531': { x: 538.8606374607072, y: 1300.1917914886792 },
	'1349339895': { x: 2301.537125518942, y: 1571.9806421732835 },
	'1361152138': { x: 4809.847863431936, y: 483.8165854232559 },
	'1361152303': { x: 4450.857883457568, y: 377.4507705065868 },
	'1367926252': { x: 2248.4180918941443, y: 253.342099737798 },
	'1437308307': { x: 2541.1680538498185, y: 1454.1246103925305 },
	'1440619218': { x: 4183.959315161035, y: 718.9100239719105 },
	'1440619222': { x: 3847.292648494387, y: 522.2433573052455 },
	'1440770727': { x: 1353.4121194238603, y: 835.7640005458722 },
	'1440838039': { x: 2550.4071118785264, y: 1812.692163021042 },
	'1440871397': { x: 2897.990903688787, y: 1655.3655182214063 },
	'1440898929': { x: 1343.835952440883, y: 2349.821441089503 },
	'1440899127': { x: 3420.6259818277063, y: 632.2433573052443 },
	'1440935467': { x: 252.19845830585106, y: 2004.4782412276347 },
	'1450550344': { x: 1591.0847585608462, y: 2172.342099737777 },
	'1450695723': { x: 848.1485140428681, y: 2368.7777090116783 },
	'1456789832': { x: 1536.9164583019417, y: 1901.3242136146257 },
	'1465125802': { x: 1857.344646764604, y: 2268.5523741375832 },
	'1468058165': { x: 870.9449389633475, y: 1836.4572632928766 },
	'1483118824': { x: 649.7954922913962, y: 689.1995639443863 },
	'1487502456': { x: 1257.1630788005896, y: 1658.8202156478476 },
	'1491066660': { x: 2568.7394063458137, y: 3262.4120756648804 },
	'1504699860': { x: 2100.2185744202966, y: 2060.524838786702 },
	'1529336927': { x: 3883.9593151610466, y: 725.5766906385816 },
	'1544797370': { x: 4161.498209108232, y: 1107.4375834896778 },
	'1557579913': { x: 1747.6634569266228, y: 1674.2339724852523 },
	'1560735414': { x: 445.4888083457643, y: 1344.764632185338 },
	'1564530719': { x: 1182.5373004960513, y: 2097.2910296492373 },
	'1586493976': { x: 2084.92847395171, y: 1798.3841224787348 },
	'1589295663': { x: 1718.0973582355077, y: 958.8085681584664 },
	'1591437487': { x: 3483.6452109468164, y: 2069.68380849261 },
	'1596227761': { x: 1461.084758560866, y: 1421.6754330711242 },
	'1609678854': { x: 2262.4713733018157, y: 3372.4496230956543 },
	'1617741451': { x: 4686.9865485196115, y: 403.27589829406463 },
	'1635656417': { x: 4133.95931516104, y: 478.91002397191124 },
	'1646945378': { x: 4644.418091894299, y: 2205.342099737832 },
	'1647234627': { x: 4362.799141426365, y: 841.5570865618608 },
	'1651326694': { x: 1854.1352303821106, y: 1966.61570677252 }
};

export const demoScale: number = 0.2238646189909879;
