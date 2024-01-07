import styled from "styled-components/native";

export const Container = styled.Pressable`
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  font-size: 14px;
`;

export const SongTitle = styled.Text`
  color: ${({ theme }) => theme.colors.black[400]};
  font-size: 16px;
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  font-weight: bold;
  max-width: 100px;
  `;

export const ForText = styled(StyledText)`
  color: #0E0D0D;
  font-weight: bold;
  max-width: 120px;
`;

export const RecipientName = styled(StyledText)`
  color: ${({ theme }) => theme.colors.gray[100]};
`;
