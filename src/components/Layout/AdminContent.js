import { Box, Container } from '@material-ui/core'
import React from 'react'

export function AdminContent({ children }) {
	return (
		<Container>
			<Box padding="24px 0">{children}</Box>
		</Container>
	)
}
