import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export * from "./utils/export"
export * from "./streamform/export"
export * from "./stream/export"
export * from "./google/export"
export * from "./essential/export"
export * from "./dialog/export"
export * from "./comments/export"
export * from "./chip/export"
export * from "./children/export"
export * from "./carousel/export"
export * from "./breadcrumps/export"
export * from "./basestream/export"
export * from "./drawer/export"
export * from "./navmenu/export"
