

function recursive(a = 5) {
	if (a > 10) {
		return a;
	}
	else {
		return recursive(a + 1);
	};
}
result = recursive(3); 