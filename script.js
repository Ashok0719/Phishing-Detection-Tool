function checkPhishing() {
  const url = document.getElementById("urlInput").value.trim();
  const result = document.getElementById("result");

  if (!url) {
    result.textContent = "Please enter a URL.";
    result.style.color = "red";
    return;
  }

  const phishingKeywords = [
    "login", "verify", "account", "update", "banking", "secure", "ebay", "paypal", "password"
  ];

  const ipPattern = /^(http:\/\/|https:\/\/)?(\d{1,3}\.){3}\d{1,3}/;
  const specialCharsPattern = /[-@!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/;

  let score = 0;

  if (ipPattern.test(url)) {
    score += 2;
  }

  for (let keyword of phishingKeywords) {
    if (url.toLowerCase().includes(keyword)) {
      score += 1;
    }
  }

  const dotCount = (url.match(/\./g) || []).length;
  if (dotCount > 4) {
    score += 1;
  }

  // Rule 4: Suspicious special characters
  if (specialCharsPattern.test(url)) {
    score += 1;
  }

  // Final Verdict
  if (score >= 4) {
    result.textContent = "⚠️ Likely Phishing URL!";
    result.style.color = "red";
  } else if (score >= 2) {
    result.textContent = "⚠️ Suspicious URL — Be Cautious!";
    result.style.color = "orange";
  } else {
    result.textContent = "✅ URL appears safe.";
    result.style.color = "green";
  }
}
