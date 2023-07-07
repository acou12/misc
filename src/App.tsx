import { ReactNode, useEffect, useState } from "react";
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
  site: string;
  setPasswords: (passwords: Password[]) => void;
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
            const inHash = await myScrypt(inputPassword, password.salt);
            if (hashesEqual(password.hash, inHash)) {
              props.setPasswords(
                props.passwords.map((password) =>
                  password.site === props.site
                    ? {
                        ...password,
                        lastGuess: Date.now(),
                        numGuesses: password.numGuesses + 1,
                      }
                    : { ...password }
                )
              );
            } else {
              props.setPasswords(
                props.passwords.map((password) =>
                  password.site === props.site
                    ? {
                        ...password,
                        lastGuess: Date.now(),
                        numGuesses: 0,
                      }
                    : { ...password }
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

const sortedBy = <T,>(arr: T[], fn: (t: T) => number) => {
  const copy = [...arr];
  return copy.sort((a, b) => fn(a) - fn(b));
};

const App = () => {
  let [passwords, setPasswords] = useState([] as Password[]);
  let [passwordStates, setPasswordStates] = useState([] as PasswordState[]);
  let [currentTime, setCurrentTime] = useState(Date.now());

  const overdue = (password: Password): number =>
    currentTime -
    password.lastGuess -
    (password.numGuesses === 0
      ? 0
      : (Math.floor(Math.pow(1.5, password.numGuesses - 1)) * 24 - 8) *
        1000 *
        60 *
        60);

  let sortedPasswords = sortedBy(passwords, (password) => -overdue(password));
  let activePassword = sortedPasswords.find(
    (password) => overdue(password) > 0
  );

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      let storedPasswords = localStorage.getItem("passwords");
      if (storedPasswords !== null) {
        setPasswords(JSON.parse(storedPasswords) as Password[]);
      }
    }

    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 200);

    return () => clearInterval(timer);
  }, [setCurrentTime]);

  return (
    <>
      <CreateNewForm
        onNewPassword={(newPassword) => {
          const newPasswords = [...passwords, newPassword];
          setPasswords(newPasswords);
          save(newPasswords);
        }}
      />
      {passwords.map(({ site, lastGuess, numGuesses }) => (
        <div key={site}>
          {/* {site} - {String.fromCharCode(...hash)} with salt{" "}
          {String.fromCharCode(...salt)} */}
          {site} - {lastGuess} - {numGuesses}
        </div>
      ))}
      {sortedPasswords.map((password, i) => (
        // overdue(password) > 0 && (
        // )
        <>
          <p
            className={optClasses(
              [i === 0, "active"],
              [overdue(password) < 0, "done"]
            )}
          >
            {password.site} - {overdue(password)}
            {optClasses([i === 0, "active"], [overdue(password) < 0, "done"])}
          </p>
        </>
      ))}
      {activePassword !== undefined && (
        <VerifyForm
          passwords={passwords}
          site={activePassword.site}
          setPasswords={(newPasswords) => {
            setPasswords(newPasswords);
            save(newPasswords);
          }}
        />
      )}
    </>
  );
};

export default App;
