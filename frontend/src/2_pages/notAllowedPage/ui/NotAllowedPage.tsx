import { Title } from '@/6_shared/ui/title';
import { Text } from '@/6_shared/ui/text';

const NotAllowedPage = () => {
	return (
		<div className='flex flex-col gap-2'>
			<Title>Доступ к приложению ограничен.</Title>
			<Text>По вопросам доступа, пожалуйста, обратитесь в ЦТР Upstream.</Text>
		</div>
	);
};

export default NotAllowedPage;
