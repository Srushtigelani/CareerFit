export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 4C11.163 4 4 11.163 4 20"
        stroke="#0F6E66"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 36c8.837 0 16-7.163 16-16"
        stroke="#B8862E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13 20.5l4.5 4.5L28 14"
        stroke="#12203B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}