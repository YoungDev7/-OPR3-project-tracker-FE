import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createProject, fetchAllProjects } from '../../store/slices/projectSlice';
import { CreateProjectRequest } from '../../types/project';
import ProjectForm from './ProjectForm';

type SortField = 'dueDate' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

export default function ProjectBoard() {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [sortField, setSortField] = useState<SortField>('updatedAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projects, isLoading } = useAppSelector((state) => state.projects);

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch]);

    const handleProjectClick = (projectId: number) => {
        navigate(`/projects/${projectId}`);
    };

    const handleCreateProject = async (data: CreateProjectRequest) => {
        await dispatch(createProject(data));
        setOpenCreateDialog(false);
    };

    const handleSort = (field: SortField) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const sortedProjects = [...projects].sort((a, b) => {
        const aValue = new Date(a[sortField]).getTime();
        const bValue = new Date(b[sortField]).getTime();
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return (
        <Box sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#424242', fontWeight: 500 }}>
                    Project List
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setOpenCreateDialog(true)}
                    sx={{
                        bgcolor: '#616161',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#424242'
                        },
                        textTransform: 'none',
                        px: 3
                    }}
                >
                    Create New
                </Button>
            </Box>

            {/* Project Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#fafafa' }}>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>Title</TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>Done Tasks / Total Tasks</TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={sortField === 'dueDate'}
                                    direction={sortField === 'dueDate' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('dueDate')}
                                    sx={{
                                        '&.MuiTableSortLabel-root': {
                                            color: '#616161',
                                        },
                                        '&.MuiTableSortLabel-root:hover': {
                                            color: '#424242',
                                        },
                                        '&.Mui-active': {
                                            color: '#424242',
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: '#424242 !important',
                                        },
                                    }}
                                >
                                    Due Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={sortField === 'updatedAt'}
                                    direction={sortField === 'updatedAt' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('updatedAt')}
                                    sx={{
                                        '&.MuiTableSortLabel-root': {
                                            color: '#616161',
                                        },
                                        '&.MuiTableSortLabel-root:hover': {
                                            color: '#424242',
                                        },
                                        '&.Mui-active': {
                                            color: '#424242',
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: '#424242 !important',
                                        },
                                    }}
                                >
                                    Updated At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>Archived</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress sx={{ color: '#616161' }} />
                                </TableCell>
                            </TableRow>
                        ) : projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography sx={{ color: '#757575', py: 4 }}>No projects yet. Create your first project!</Typography>
                                </TableCell>
                            </TableRow>
                        ) : sortedProjects.map((project) => {
                            const doneTasks = project.tasks?.filter(t => t.status === 'DONE').length || 0;
                            const totalTasks = project.tasks?.length || 0;

                            return (
                                <TableRow
                                    key={project.id}
                                    onClick={() => handleProjectClick(project.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: '#f5f5f5'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ color: '#424242' }}>{project.title}</TableCell>
                                    <TableCell sx={{ color: '#616161' }}>{doneTasks} / {totalTasks}</TableCell>
                                    <TableCell sx={{ color: '#616161' }}>
                                        {new Date(project.dueDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={{ color: '#616161' }}>
                                        {new Date(project.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={{ color: '#616161' }}>
                                        {project.isArchived ? 'Yes' : 'No'}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create Project Dialog */}
            <Dialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <ProjectForm
                    onSubmit={handleCreateProject}
                    onCancel={() => setOpenCreateDialog(false)}
                />
            </Dialog>
        </Box>
    );
}
