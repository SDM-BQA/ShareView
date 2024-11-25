import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id:'u1',
      image:
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "SDM",
      placeCount: 5,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
