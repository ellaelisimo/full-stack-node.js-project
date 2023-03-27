import { ListItem, ListItemText, Typography } from "@mui/material";

export const Participant = (props: any) => {
  const { participant } = props;
  const { name, surname, email, date_of_birth, age, date_of_registration } =
    participant;

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexDirection: "row",
        }}
      >
        <ListItemText
          primary={`${name} ${surname}`}
          secondary={
            <>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Date of birth: {date_of_birth}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Age: {age}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Registered: {date_of_registration}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
};
