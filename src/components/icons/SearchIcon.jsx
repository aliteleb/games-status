export default function SearchIcon(props){
    return(
        <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="40px"
            width="30px"
            {...props}
        >
            <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
            <path d="M21 21l-4.35-4.35" />
        </svg>
    );
}