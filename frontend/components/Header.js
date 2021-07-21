import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>search</p>
      </div>
    </header>
  );
}
