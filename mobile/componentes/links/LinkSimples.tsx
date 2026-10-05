import { ReactNode } from 'react'
import { Link, RelativePathString } from 'expo-router'
import { Pressable } from 'react-native'

type Props = {
  to?: RelativePathString | string
  children: ReactNode
  classeAdicional?: string
}

const LinkSimples = ({ to = '/', children, classeAdicional = '' }: Props) => {
  return (
    <Link href={to as RelativePathString} asChild>
      <Pressable className={classeAdicional}>
        {children}
      </Pressable>
    </Link>
  )
}

export default LinkSimples