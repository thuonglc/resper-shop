import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Iconify from 'components/Iconify'
import { fShortenNumber } from 'utils/formatNumber'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none',
		textAlign: 'center',
		padding: theme.spacing(5, 0),
		color: '#005249',
		backgroundColor: '#c8facd',
		borderRadius: '1rem',
	},
	iconWrapper: {
		margin: 'auto',
		display: 'flex',
		alignItems: 'center',
		width: theme.spacing(8),
		height: theme.spacing(8),
		justifyContent: 'center',
		marginBottom: theme.spacing(3),
		color: theme.palette.primary.dark,
	},
	icon: {
		margin: 'auto auto 24px',
		display: 'flex',
		borderRadius: '50%',
		WebkitBoxAlign: 'center',
		alignItems: 'center',
		width: '64px',
		height: '64px',
		WebkitBoxPack: 'center',
		justifyContent: 'center',
		color: '#007b55',
		backgroundImage:
			'linear-gradient(\n135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)',
	},
}))

// ----------------------------------------------------------------------

const TOTAL = 714000

export default function AppWeeklySales() {
	const classes = useStyles()
	return (
		<Card className={classes.root}>
			<div className={classes.iconWrapper}>
				<div className={classes.icon}>
					<Iconify icon={'material-symbols:point-of-sale'} width="2rem" height="2rem" />
				</div>
			</div>
			<Typography variant="h4" color="inherit">
				{fShortenNumber(TOTAL)}
			</Typography>
			<Typography variant="subtitle2" color="inherit" sx={{ opacity: 0.72 }}>
				Weekly Sales
			</Typography>
		</Card>
	)
}
