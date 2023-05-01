import Link from "next/link";

export default function NavLink() {
    return (
        <ul>
            <li className="selected">
                <Link href="/">Trade</Link>
            </li>
            <li>
                <Link href="/">Earn</Link>
            </li>
            <li>
                <Link href="/">Support</Link>
            </li>
            <li>
                <Link href="/">About</Link>
            </li>
        </ul>
    )
}