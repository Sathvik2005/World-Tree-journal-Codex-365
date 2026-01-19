/**
 * Test Runner for 365-Day World Tree Completion
 * Run with: node src/tests/run365Test.js
 */

// Polyfill localStorage for Node environment
global.localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

// Import test functions
import { run365DayTest, verifyFinalState } from './365DayCompletion.test.js';

// Run the test
async function main() {
  try {
    console.log('🚀 Initializing 365-Day World Tree Test Runner...\n');
    
    // Run the full 365-day simulation
    const results = await run365DayTest();
    
    // Verify the final state
    const passed = verifyFinalState(results);
    
    // Exit with appropriate code
    process.exit(passed ? 0 : 1);
    
  } catch (error) {
    console.error('\n❌ Test runner failed:', error);
    process.exit(1);
  }
}

main();
