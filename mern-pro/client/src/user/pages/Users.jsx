import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {id:Math.random().toString(),
      image:"https://images.unsplash.com/photo-1731921954767-8473de81c99e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name:"SDM",
      placeCount:5
    }
  ];
  return <UsersList items={USERS}/>
}

export default Users