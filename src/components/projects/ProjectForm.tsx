import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateProjectRequest, Project, UpdateProjectRequest } from '../../types/project';

interface ProjectFormProps {
    project?: Project;
    onSubmit: (data: CreateProjectRequest | UpdateProjectRequest) => void;
    onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateProjectRequest | UpdateProjectRequest>({
        defaultValues: {
            title: project?.title || '',
            description: project?.description || '',
            dueDate: project?.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : ''
        }
    });

    const onFormSubmit = (data: CreateProjectRequest | UpdateProjectRequest) => {
        // Convert date to ISO format for API
        const formattedData = {
            ...data,
            dueDate: new Date(data.dueDate).toISOString()
        };
        onSubmit(formattedData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
            <DialogTitle sx={{ color: '#ff6b6b' }}>
                {project ? 'Edit Project' : 'Create New Project'}
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
                    {project ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Box>
    );
}
