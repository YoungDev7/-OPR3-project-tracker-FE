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
import { Task, TaskStatus } from '../../types/project';

interface TaskFormProps {
    task?: Task;
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
}

interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskFormData>({
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            status: task?.status || TaskStatus.TODO,
            dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
        }
    });



    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ color: '#ff6b6b' }}>
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
                                    borderColor: '#ff6b6b'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ff6b6b'
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
                                    borderColor: '#ff6b6b'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ff6b6b'
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
                                    borderColor: '#ff6b6b'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ff6b6b'
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
                                    borderColor: '#ff6b6b'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#ff6b6b'
                            }
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onCancel}
                    sx={{
                        color: '#666',
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
                        bgcolor: '#ff6b6b',
                        '&:hover': {
                            bgcolor: '#ff5252'
                        }
                    }}
                >
                    {task ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Box>
    );
}
