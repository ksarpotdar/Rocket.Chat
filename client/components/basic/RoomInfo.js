import React from 'react';
import { Box, Margins, Icon, Button, ButtonGroup, Divider } from '@rocket.chat/fuselage';
import { css } from '@rocket.chat/css-in-js';

import RoomAvatar from './avatar/RoomAvatar';
import { useTranslation } from '../../contexts/TranslationContext';
import UserCard from './UserCard';
import VerticalBar from './VerticalBar';

const wordBreak = css`
	word-break: break-word !important;
`;

const Label = (props) => <Box fontScale='p2' color='default' {...props} />;
const Info = ({ className, ...props }) => <UserCard.Info className={[className, wordBreak]} flexShrink={0} {...props}/>;

export const RoomInfoIcon = ({ name }) => <Icon name={name} size='x22' />;

export const Title = (props) => <UserCard.Username {...props}/>;

export const RoomInfo = function RoomInfo({
	name,
	description,
	announcement,
	topic,
	type,
	rid,
	icon,
	onClickHide,
	onClickLeave,
	onClickEdit,
	onClickDelete,
	...props
}) {
	const t = useTranslation();

	return (
		<>
			<VerticalBar.Header>
				<VerticalBar.Icon name='info-circled'/>
				<VerticalBar.Text>{t('Room_Info')}</VerticalBar.Text>
				<VerticalBar.Close />
			</VerticalBar.Header>

			<VerticalBar.ScrollableContent p='x24' {...props}>
				<Margins block='x4'>
					<Box pbe='x16'>
						<RoomAvatar size={'x332'} room={{ _id: rid, type, t: type } } />
						<RoomInfo.Title name={name} status={<RoomInfo.Icon name={icon} />}>{name}</RoomInfo.Title>
					</Box>

					{description && description !== '' && <Box pbe='x16'>
						<Label>{t('Description')}</Label>
						<Info withTruncatedText={false}>{description}</Info>
					</Box>}

					{announcement && announcement !== '' && <Box pbe='x16'>
						<Label>{t('Announcement')}</Label>
						<Info withTruncatedText={false}>{announcement}</Info>
					</Box>}

					{topic && topic !== '' && <Box pbe='x16'>
						<Label>{t('Topic')}</Label>
						<Info withTruncatedText={false}>{topic}</Info>
					</Box>}
				</Margins>
			</VerticalBar.ScrollableContent>

			<Box p='x24'>
				<Margins block='x12'>
					<ButtonGroup stretch>
						{ onClickHide && <Button onClick={onClickHide}><Box is='span' mie='x4'><Icon name='eye-off' size='x20' /></Box>{t('Hide')}</Button> }
						{ onClickLeave && <Button onClick={onClickLeave} danger><Box is='span' mie='x4'><Icon name='sign-out' size='x20' /></Box>{t('Leave')}</Button> }
					</ButtonGroup>
					{ (onClickEdit || onClickDelete) && <Divider /> }
					<ButtonGroup stretch>
						{ onClickEdit && <Button onClick={onClickEdit}><Box is='span' mie='x4'><Icon name='edit' size='x20' /></Box>{t('Edit')}</Button> }
						{ onClickDelete && <Button onClick={onClickDelete} danger><Box is='span' mie='x4'><Icon name='trash' size='x20' /></Box>{t('Trash')}</Button>}
					</ButtonGroup>
				</Margins>
			</Box>


		</>
	);
};

RoomInfo.Title = Title;
RoomInfo.Icon = RoomInfoIcon;

export default React.memo(RoomInfo);
