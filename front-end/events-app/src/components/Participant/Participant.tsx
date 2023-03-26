export const Participant = (props: any) => {
  const { participant } = props;
  const { id, name, surname, email, date_of_birth, age, date_of_registration } =
    participant;

  return (
    <>
      <h3>
        {name} {surname}
      </h3>
      <p>Id: {id}</p>
      <p>Email: {email}</p>
      <p>DOB: {date_of_birth}</p>
      <p>Age: {age}</p>
      <p>Registered: {date_of_registration}</p>
    </>
  );
};
