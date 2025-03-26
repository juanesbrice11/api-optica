export class Vision {
  validate(value: string[], args: any) {
      // Validar que el primer elemento sea "lejos" o "cerca"
      const firstElementValid = value[0] === 'lejos' || value[0] === 'cerca';
      // Validar que el segundo elemento sea "OD" o "OI"
      const secondElementValid = value[1] === 'OD' || value[1] === 'OI';
      return firstElementValid && secondElementValid;
  }

  defaultMessage(args: any) {
      return 'El primer elemento debe ser "lejos" o "cerca" y el segundo "OD" o "OI".';
  }
}