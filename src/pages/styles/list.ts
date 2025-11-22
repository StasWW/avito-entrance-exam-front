import type {CSSProperties} from "react";

interface filterStyles {
  container: CSSProperties
}

export default function listGetStyle (): filterStyles {
  return (
    {
      container: {
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: "center",
        margin: '0 auto',
        gap: '16px',
        padding: '16px',
        boxSizing: 'border-box',
      },
    }
  )
}
