import Image from 'next/image';
import Img1 from './Img1.jpg';

export default function Home() {
  return (
    <>
      <div >
        <header className="navbar-light bg-light text-center mt-5">
          <br />
          <h1>Welcome to the Internal Dispatch System</h1>
          <br />
        </header>
      </div>
      <br />
      <main>
        <div>
          <Image
            src={Img1}
            alt="Your Image"
            width={500}
            height={300}
            className="img-fluid"
            padding={10}
          />
          <br />
          <br />
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            fringilla ligula. Curabitur sit amet libero auctor, tincidunt urna
            id, ultrices felis. Sed et elit ut orci pulvinar aliquet.
          </p>
          <p>
            Sed posuere iaculis enim, a cursus velit molestie vitae. Nam quis
            eleifend nunc. Duis consequat faucibus neque, vel tempor orci
            hendrerit a. Quisque eu hendrerit dolor.
          </p>
        </div>
      </main>
      <footer className="bg-light p-3">
        <div className="container text-center">
          <br />
          <br />

          <p>© 2023 SeneCoders. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
