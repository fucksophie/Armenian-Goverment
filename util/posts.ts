import fs from 'fs';

export class Post {
	image: string = '';

	title: string = '';

	constructor(image: string, title: string) {
		this.image = image;
		this.title = title;
	}
}

function ensurePosts(): void {
	if (!fs.existsSync('posts.json')) {
		fs.writeFileSync('posts.json', '[]');
	}
}

export function getPosts(): Post[] {
	ensurePosts();

	return JSON.parse(fs.readFileSync('posts.json').toString());
}

export function setPosts(posts: Post[]): void {
	ensurePosts();

	fs.writeFileSync('posts.json', JSON.stringify(posts, null, 4));
}

export function addPost(post: Post): void {
	const posts: Post[] = getPosts();
	posts.push(post);

	setPosts(posts);
}
