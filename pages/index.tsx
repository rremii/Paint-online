import styled from "styled-components"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push((+new Date()).toString(16))
  }, [])

  return <></>
}
