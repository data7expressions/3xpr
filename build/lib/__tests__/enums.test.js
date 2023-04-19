"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('Enums', () => {
    test('create', () => {
        __1.expressions.addEnum('ColorConversion', [['BGR2GRAY', 6], ['BGR2HSV', 40], ['BGR2RGB', 4], ['GRAY2BGR', 8], ['HSV2BGR', 54], ['HSV2RGB', 55], ['RGB2GRAY', 7], ['RGB2HSV', 41]]);
        __1.expressions.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 });
        expect(8).toBe(__1.expressions.eval('ColorConversion.GRAY2BGR'));
        expect(2).toBe(__1.expressions.eval('Color.GREEN'));
    });
});
//# sourceMappingURL=enums.test.js.map