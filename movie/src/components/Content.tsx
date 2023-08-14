import styled from 'styled-components';

const ContentStyle = styled.div`
	padding-top: 10vh;
`;

export default function Content({children}:React.PropsWithChildren) {
	return <ContentStyle>{children}</ContentStyle>;
}
