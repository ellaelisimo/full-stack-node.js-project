import { Box, ListItem, ListItemText, Typography } from "@mui/material";

export const User = (props: any) => {
  const { user } = props;
  const { id, name, surname, email, date_of_birth, age } = user;

  return (
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "left",
                flexWrap: "nowrap",
                flexDirection: "row",
                padding: "1rem",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                ID: {id}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Email: {email}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Date of birth: {date_of_birth}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Age: {age}
              </Typography>
            </Box>
          </>
        }
      />
    </ListItem>
  );
};
