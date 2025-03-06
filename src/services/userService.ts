import { User } from '../entities/user';
import { AppDataSource } from '../utils/db';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    // Get the user profile by ID
    async getUserProfile(userId: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id: userId }, select: { password: false } });
        delete user?.password;
        return user;
    }

    // Update the user profile
    async updateUserProfile(userId: number, data: any): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        // Update the user with the provided data
        // `Object.assign` will update the user object with the provided fields in `data`
        Object.assign(user, data);

        const updatedDoc = await this.userRepository.save(user);
        delete updatedDoc?.password;
        return updatedDoc;
    }
}
