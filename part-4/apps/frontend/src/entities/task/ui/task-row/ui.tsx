import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../../../../shared';

interface Props extends Task {
  handleToggle: (
    data: Pick<Task, 'title' | '_id' | 'description' | 'completed'>
  ) => void;
  onClickDeleteIcon: (id: string) => void;
}

export const TaskRow = ({
  completed,
  _id,
  title,
  description,
  handleToggle,
  onClickDeleteIcon,
}: Props) => {
  return (
    <ListItem
      color={'primary'}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onClickDeleteIcon(_id)}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() =>
          handleToggle({ _id, title, description, completed: !completed })
        }
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': _id }}
          />
        </ListItemIcon>
        <ListItemText id={_id} primary={title} secondary={description} />
      </ListItemButton>
    </ListItem>
  );
};
