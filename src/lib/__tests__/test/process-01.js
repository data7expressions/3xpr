//TODO: Tener en cuenta que en los procesos se debería pasar por los diferente steps/nodos sin guarda en la pila.
// solo se debería guardar cual es el paso actual y el stack dentro de este paso.
// dado que si debería salir y continuar , debería ir directamente al paso/nodo actual

//al invocar un proceso, se debe generar un child token el cual quedara referenciado al token padre.

// Tener en cuenta:
// cuando se ejecuta un proceso este puede retornar en los siguientes casos
// por que finalizo: se deberá mapear las variables de salida con las variables del proceso que lo invoco.
// por un break:
//          por signal: quedara en proceso en await y si el  proceso padre solo esta a la espera de este sub-proceso también debería quedar en await.
//          por error: debería quedar en error , si el proceso padre tiene un catch de error, lo podría capturar , caso contrario también quedaría en error.    


class Process {

	constructor(starts) {
		this.__starts = starts
	}

	_start() {
		//ejecutara los starts.
		this.__starts
	}
}
class Process01 extends Process {
	constructor(a, b) {
		this.a = a;
		this.b = b;
		super(this.start);
	}
	start() {
		if (this.a > this.b) {
			this.subtraction();
		} else {
			this.addition();
		}
	}
	addition() {
		this.result = this.a + this.b;
		this.end();
	}
	subtraction() {
		this.result = this.a - this.b;
		this.end();
	}
	end() {
		this.result = result;
		return;
	}

}
//callProcess(name,args)
result = callProcess('Process01', [2, 4])
