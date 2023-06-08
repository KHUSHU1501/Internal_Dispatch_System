import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Internal Dispatch System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Internal Dispatch System</h1>
        <p className={styles.description}>
          <code className={styles.code}>
            {" "}
            This is prototype for Internal Dispatch System being developed by
            SeneCoders.
          </code>
        </p>
        <div className={styles.grid}>
          <a href="/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Log in to the system</p>
          </a>
          <a href="/register" className={styles.card}>
            <h2>Register &rarr;</h2>
            <p>Register a new user</p>
          </a>
          <a href="/dashboard" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>View the dashboard</p>
          </a>
        </div>
        <footer className={styles.footer}>
          <a href="/about" target="_blank" rel="noopener noreferrer">
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/senevirathne.svg"
                alt="SeneCoders"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </main>
    </>
  );
}