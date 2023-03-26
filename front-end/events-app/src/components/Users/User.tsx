export const User = (props: any) => {
  const { user } = props;
  const { id, name, surname, email, date_of_birth, age } = user;

  return (
    <>
      <h2>
        {name} {surname}
      </h2>
      <p>Id: {id}</p>
      <p>Email: {email}</p>
      <p>DOB: {date_of_birth}</p>
      <p>Age: {age}</p>
    </>
  );
};
