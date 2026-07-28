import styles from "./ErrorPage.module.css";

import { Link } from "react-router";

export default function ErrorPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>404 Error Encountered</h1>
                <Link to={"/"}>Click here to return home</Link>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%">
                    <path style={{fill: `url(#RainbowGradient)`}} d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm16.5 138.5Q301-343 276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420q-68 0-123.5 38.5Zm-32.5 270Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/>
                    <defs>
                        <linearGradient id="RainbowGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="#e35576" />
                            <stop offset="25%" stopColor="#e35576" />

                            <stop offset="25%" stopColor="#e8c97a" />
                            <stop offset="50%" stopColor="#e8c97a" />

                            <stop offset="50%" stopColor="#63b4d6" />
                            <stop offset="75%" stopColor="#63b4d6" />

                            <stop offset="75%" stopColor="#976a32" />
                            <stop offset="100%" stopColor="#976a32" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}