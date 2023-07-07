import React, { ReactNode, useEffect, useState } from "react";
import "./App.css";
// @ts-ignore
import { scrypt, syncScrypt } from "./scrypt.js";

type Password = {
  site: string;
  hash: number[];
  salt: number[];
  /** in unix time. */
  lastGuess: number;
  numGuesses: number;
};

enum PasswordState {
  WAITING,
  CHECKING,
  READY,
  CORRECT,
  INCORRECT,
}

const save = (passwords: Password[]) => {
  console.log(passwords);
  localStorage.setItem("passwords", JSON.stringify(passwords));
};

const stringToNumArray = (s: string) => {
  return s.split("").map((c) => c.charCodeAt(0));
};

const randomSalt = (length: number) => {
  let res = [];
  for (let i = 0; i < length; i++) {
    res.push(Math.floor(Math.random() * 256));
  }
  return res;
};

const hashesEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

let initialized = false;

const CreateNewForm = (props: {
  onNewPassword: (password: Password) => void;
}) => {
  let [inputSite, setInputSite] = useState("");
  let [inputPassword, setInputPassword] = useState("");

  const myScrypt = (password: string, salt: number[]) =>
    scrypt(stringToNumArray(password), salt, Math.pow(2, 15), 1, 1, 100).then(
      Array.from
    );

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const salt = randomSalt(32);
          const hash = await myScrypt(inputPassword, salt);
          const newPassword: Password = {
            site: inputSite,
            hash,
            salt,
            lastGuess: Date.now(),
            numGuesses: 0,
          };

          props.onNewPassword(newPassword);

          setInputSite("");
          setInputPassword("");
        }}
      >
        <input
          type="text"
          placeholder="Site"
          value={inputSite}
          onChange={(e) => setInputSite(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.currentTarget.value)}
        />
        <input type="submit" value="add" />
      </form>
    </>
  );
};

const VerifyForm = (props: {
  passwords: Password[];
  passwordStates: PasswordState[];
  site: string;
  setPasswords: (update: (passwords: Password[]) => Password[]) => void;
  setPasswordStates: (
    update: (passwordStates: PasswordState[]) => PasswordState[]
  ) => void;
}) => {
  let [inputPassword, setInputPassword] = useState("");

  let password = props.passwords.find(
    (password) => password.site === props.site
  )!;

  const myScrypt = (password: string, salt: number[]) =>
    scrypt(stringToNumArray(password), salt, Math.pow(2, 15), 1, 1, 100).then(
      Array.from
    );

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (password === undefined) {
          } else {
            props.setPasswordStates((oldPasswordStates) =>
              oldPasswordStates.map((oldState, i) =>
                props.passwords[i].site === props.site
                  ? PasswordState.CHECKING
                  : oldState
              )
            );
            const inHash = await myScrypt(inputPassword, password.salt);
            if (hashesEqual(password.hash, inHash)) {
              props.setPasswords((oldPasswords) =>
                oldPasswords.map((password) =>
                  password.site === props.site
                    ? {
                        ...password,
                        lastGuess: Date.now(),
                        numGuesses: password.numGuesses + 1,
                      }
                    : { ...password }
                )
              );
              props.setPasswordStates((oldPasswordStates) =>
                oldPasswordStates.map((oldState, i) =>
                  props.passwords[i].site === props.site
                    ? PasswordState.CORRECT
                    : oldState
                )
              );
            } else {
              props.setPasswords((oldPasswords) =>
                oldPasswords.map((password) =>
                  password.site === props.site
                    ? {
                        ...password,
                        lastGuess: Date.now(),
                        numGuesses: 0,
                      }
                    : { ...password }
                )
              );
              props.setPasswordStates((oldPasswordStates) =>
                oldPasswordStates.map((oldState, i) =>
                  props.passwords[i].site === props.site
                    ? PasswordState.INCORRECT
                    : oldState
                )
              );
            }
            setInputPassword("");
          }
        }}
      >
        <span>{props.site}:</span>
        <input
          type="text"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.currentTarget.value)}
        />
        <input type="submit" value="check" />
      </form>
    </>
  );
};

const optClasses = (...arr: [boolean, string][]) =>
  arr.flatMap(([condition, cls]) => (condition ? [cls] : [])).join(" ");

const zip = <A, B>(as: A[], bs: B[]): [A, B][] => as.map((a, i) => [a, bs[i]]);

const sortedBy = <T,>(arr: T[], fn: (t: T) => number) => {
  const copy = [...arr];
  return copy.sort((a, b) => fn(a) - fn(b));
};

const App = () => {
  let [passwords, setPasswords] = useState([] as Password[]);
  let [passwordStates, setPasswordStates] = useState([] as PasswordState[]);
  let [currentTime, setCurrentTime] = useState(Date.now());

  const setAndSavePasswords = (
    update: (passwords: Password[]) => Password[]
  ) => {
    setPasswords(update);
    save(update(passwords));
  };

  const overdue = (password: Password): number =>
    currentTime - password.lastGuess - password.numGuesses * 10_000;

  let sortedPasswordsAndStates = sortedBy(
    zip(passwords, passwordStates),
    ([password, _state]) => -overdue(password)
  );

  let activePassword = sortedPasswordsAndStates.find(
    ([password, state]) =>
      overdue(password) > 0 && state !== PasswordState.CHECKING
  );

  // const overdue = (password: Password): number =>
  //   currentTime -
  //   password.lastGuess -
  //   (password.numGuesses === 0
  //     ? 0
  //     : (Math.floor(Math.pow(1.5, password.numGuesses - 1)) * 24 - 8) *
  //       1000 *
  //       60 *
  //       60);

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      let newPasswords: Password[];
      let storedPasswords = localStorage.getItem("passwords");
      if (storedPasswords !== null) {
        newPasswords = JSON.parse(storedPasswords) as Password[];
      } else {
        newPasswords = [];
      }
      setPasswords(newPasswords);
      setPasswordStates(
        newPasswords.map((password) =>
          overdue(password) > 0 ? PasswordState.READY : PasswordState.WAITING
        )
      );
    }

    const timer = setInterval(() => {
      const newCurrentTime = Date.now();
      setCurrentTime(newCurrentTime);

      setPasswordStates(
        passwordStates.map((oldState, i) => {
          const password = passwords[i];
          switch (oldState) {
            case PasswordState.CORRECT:
              return overdue(password) > 0
                ? PasswordState.READY
                : PasswordState.CORRECT;
            case PasswordState.INCORRECT:
              return PasswordState.INCORRECT;
            case PasswordState.READY:
              return PasswordState.READY;
            case PasswordState.WAITING:
              return overdue(password) > 0
                ? PasswordState.READY
                : PasswordState.WAITING;
            case PasswordState.CHECKING:
              return PasswordState.CHECKING;
          }
        })
      );
    }, 200);

    return () => clearInterval(timer);
  }, [setCurrentTime, passwords, passwordStates, setPasswordStates]);

  return (
    <>
      <CreateNewForm
        onNewPassword={(newPassword) => {
          const newPasswords = [...passwords, newPassword];
          setPasswords(newPasswords);
          save(newPasswords);

          setPasswordStates([...passwordStates, PasswordState.WAITING]);
        }}
      />
      {sortedPasswordsAndStates.map(
        ([{ site, lastGuess, numGuesses }, state], i) => (
          <React.Fragment key={site}>
            <div
              className={
                ["waiting", "checking", "ready", "correct", "incorrect"][state]
              }
            >
              {site} - {lastGuess} - {numGuesses} - {state}
            </div>
          </React.Fragment>
        )
      )}
      {activePassword !== undefined ? (
        <VerifyForm
          passwordStates={passwordStates}
          passwords={passwords}
          setPasswordStates={setPasswordStates}
          setPasswords={setAndSavePasswords}
          site={activePassword[0].site}
          key={activePassword[0].site}
        ></VerifyForm>
      ) : (
        <p>all caught up!</p>
      )}
    </>
  );
};

export default App;
