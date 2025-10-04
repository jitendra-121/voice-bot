#!/bin/bash

# test-local.sh - Quick local API tests
# This script tests the /api/chat endpoint locally

echo "🧪 Testing Voice Chatbot API locally..."
echo

# Test 1: Missing body should return 400
echo "Test 1: POST with no body (should return 400)"
response=$(curl -s -w "%{http_code}" -X POST http://localhost:3000/api/chat -o /tmp/test_response.json 2>/dev/null)
http_code="${response: -3}"

if [ "$http_code" = "400" ]; then
    echo "✅ PASS: Got 400 for missing body"
else
    echo "❌ FAIL: Expected 400, got $http_code"
    exit 1
fi

# Test 2: Missing API key should return 500 (if no key is set)
echo
echo "Test 2: Check API key handling"
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Testing without API key (should return 500)"
    response=$(curl -s -w "%{http_code}" -X POST http://localhost:3000/api/chat \
        -H "Content-Type: application/json" \
        -d '{"text":"test"}' \
        -o /tmp/test_response.json 2>/dev/null)
    http_code="${response: -3}"
    
    if [ "$http_code" = "500" ]; then
        echo "✅ PASS: Got 500 for missing API key"
    else
        echo "❌ FAIL: Expected 500, got $http_code"
        exit 1
    fi
else
    echo "✅ API key is set - skipping missing key test"
fi

# Test 3: Method not allowed should return 405
echo
echo "Test 3: GET request (should return 405)"
response=$(curl -s -w "%{http_code}" -X GET http://localhost:3000/api/chat -o /tmp/test_response.json 2>/dev/null)
http_code="${response: -3}"

if [ "$http_code" = "405" ]; then
    echo "✅ PASS: Got 405 for GET method"
else
    echo "❌ FAIL: Expected 405, got $http_code"
    exit 1
fi

echo
echo "🎉 All API tests passed!"
echo "💡 To test with a real API key, set OPENAI_API_KEY and run again"

# Cleanup
rm -f /tmp/test_response.json