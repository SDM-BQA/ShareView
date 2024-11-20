/* eslint-disable react/prop-types */
import UserItem from './UserItem'
import './UserLists.css'

const UsersList = (props) => {
  if(props.items.length == 0){
    return(
      <div className="center">
        <h2>No Users Found</h2>
      </div>
    )
  }
  return(
    <ul>
      {props.items.map((user)=>{
        <UserItem
        key={user.id}
        id={user.id}
        image={user.image}
        name={user.name}
        placeCount={user.placeCount}
        />
      })}
    </ul>
  )
}

export default UsersList