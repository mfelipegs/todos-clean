
import { TaskUseCases } from '../src/application/usecases/taskUseCases.js';
import { ITaskRepository } from '../src/domain/interfaces/ITaskRepository.js';

class MockRepository extends ITaskRepository {
  constructor() {
    super();
    this.create = jest.fn();
    this.findAll = jest.fn();
    this.delete = jest.fn();
  }
}

describe('TaskUseCases', () => {
  const mockRepository = new MockRepository();
  const useCase = new TaskUseCases(mockRepository);

  test('listTasks should return tasks from repository', async () => {
    const tasks = [{ id: 1, title: 'Test Task' }];
    mockRepository.findAll.mockResolvedValue(tasks);

    const result = await useCase.listTasks();

    expect(result).toEqual(tasks);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  test('createTask should call repository create', async () => {
    const taskData = { title: 'New Task' };
    mockRepository.create.mockResolvedValue({ id: 1, ...taskData });

    const result = await useCase.createTask(taskData);

    expect(result).toEqual({ id: 1, ...taskData });
    expect(mockRepository.create).toHaveBeenCalledWith(taskData);
  });
});
