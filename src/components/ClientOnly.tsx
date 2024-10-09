import { ReactNode, useState, useEffect } from 'react'

export default function ClientOnly({ children, ...delegated }: { children: ReactNode; [key: string]: any }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}