export function convertTemp( value, units ) {
	if ( units === 'c' ) {
		return Math.round( value );
	}

	return Math.round( value * ( 9 / 5 ) + 32 );
}
