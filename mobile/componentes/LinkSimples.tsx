import { View, Text } from 'react-native'
import { ReactNode } from 'react'
import { Link, RelativePathString } from 'expo-router'

const LinkSimples = ({
    to,
    children
} : {
    to?: RelativePathString, 
    children: ReactNode,  
}) => {
    const classeBase = `text-destaque-s-escuro`

  return (
    <Link href={to ?? '/'}>
        <Text className={classeBase}>
            {children}
        </Text>
    </Link>
  )
}

export default LinkSimples