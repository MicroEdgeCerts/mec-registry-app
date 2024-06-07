import React from 'react';
import styles from './MyComponent.module.scss'
// プロパティの型を定義
interface MyComponentProps {
  active: boolean
  title: string
}


/*
Here it takes boolean type active / string type title. 

 */
const MyComponent: React.FC<MyComponentProps> = ({active, title})=> {

  return <div className={`${styles.step} ${(active ? styles.active:"")}`}>
      {title}
      </div>
}

export default MyComponent;