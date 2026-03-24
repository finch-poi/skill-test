#!/bin/bash
# Run all component tests one by one and collect results
cd "$(dirname "$0")"

PASS=0
FAIL=0
SKIP=0
RESULTS=""

for spec in e2e/component-test/*.spec.ts; do
  filename=$(basename "$spec")
  echo "=== Running $filename ==="
  output=$(npx playwright test "$spec" --project="Google Chrome" --reporter=line --workers=1 --timeout=60000 2>&1)
  exit_code=$?
  summary=$(echo "$output" | tail -3)
  echo "$summary"
  echo ""
  
  if echo "$output" | grep -q "passed"; then
    passed=$(echo "$output" | grep -oP '\d+ passed' | grep -oP '\d+')
    failed=$(echo "$output" | grep -oP '\d+ failed' | grep -oP '\d+')
    if [ -n "$passed" ]; then
      PASS=$((PASS + passed))
    fi
    if [ -n "$failed" ]; then
      FAIL=$((FAIL + failed))
    fi
    RESULTS="${RESULTS}\n${filename}: ${passed:-0} passed, ${failed:-0} failed"
  else
    SKIP=$((SKIP + 1))
    RESULTS="${RESULTS}\n${filename}: TIMEOUT/HANG"
  fi
done

echo ""
echo "=== SUMMARY ==="
echo -e "$RESULTS"
echo ""
echo "Total: $PASS passed, $FAIL failed, $SKIP skipped"
