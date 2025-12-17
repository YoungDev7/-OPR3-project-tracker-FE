import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateTaskRequest, Task, TaskStatus, UpdateTaskRequest } from '../../types/project';

interface TaskFormProps {
    task?: Task;
    onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => void;
    onCancel: () => void;
    onDelete?: () => void;
}

export default function TaskForm({ task, onSubmit, onCancel, onDelete }: TaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateTaskRequest | UpdateTaskRequest>({
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            status: task?.status || TaskStatus.TODO,
            dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
        }
    });

    const onFormSubmit = (data: CreateTaskRequest | UpdateTaskRequest) => {
        // Convert date to ISO format for API
        const formattedData = {
            ...data,
            dueDate: new Date(data.dueDate).toISOString()
        };
        onSubmit(formattedData);
    };



    return (
        <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
            <DialogTitle sx={{ color: '#424242' }}>
                {task ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Title"
                        fullWidth
                        {...register('title', {
                            required: 'Title is required',
                            minLength: { value: 3, message: 'Title must be at least 3 characters' }
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#616161'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#616161'
                            }
                        }}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        {...register('description', {
                            required: 'Description is required',
                            minLength: { value: 10, message: 'Description must be at least 10 characters' }
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#616161'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#616161'
                            }
                        }}
                    />

                    <TextField
                        label="Status"
                        select
                        fullWidth
                        {...register('status', {
                            required: 'Status is required'
                        })}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        defaultValue={task?.status || TaskStatus.TODO}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#616161'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#616161'
                            }
                        }}
                    >
                        <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
                        <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
                        <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
                    </TextField>

                    <TextField
                        label="Due Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...register('dueDate', {
                            required: 'Due date is required'
                        })}
                        error={!!errors.dueDate}
                        helperText={errors.dueDate?.message}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#616161'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#616161'
                            }
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                {task && onDelete && (
                    <Button
                        onClick={onDelete}
                        sx={{
                            color: '#d32f2f',
                            borderColor: '#d32f2f',
                            mr: 'auto',
                            '&:hover': {
                                bgcolor: 'rgba(211, 47, 47, 0.04)',
                                borderColor: '#c62828'
                            }
                        }}
                        variant="outlined"
                    >
                        Delete Task
                    </Button>
                )}
                <Button
                    onClick={onCancel}
                    sx={{
                        color: '#757575',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.05)'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: '#616161',
                        '&:hover': {
                            bgcolor: '#424242'
                        }
                    }}
                >
                    {task ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Box>
    );
}
