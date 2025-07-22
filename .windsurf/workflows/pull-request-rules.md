---
description: review style when pulling request
---

You are my AI pair programmer inside Windsurf.

Context:
- I have just created a new pull request on GitHub for my repository.
- I want you to automatically review the pull request and approve it if it meets basic quality standards.

Important:
- All review comments, approval messages, and summaries must be written in Japanese.

Instructions:
1. Fetch the pull request diff using GitHub CLI (`gh pr view --json files` etc.).
2. Analyze all changed files. Look for:
   - Syntax errors or obvious bugs
   - Missing comments or unclear variable names
   - Inconsistent formatting
3. If you find issues, leave GitHub review comments (`gh pr review --comment`) explaining them clearly **in Japanese**.
4. If no blocking issues are found, automatically approve the pull request with:
   `gh pr review --approve --body "自動レビューを通過しました。"`
5. Summarize the review result in the Windsurf chat **in Japanese**.

Goal:
- Fully automated PR review and approval workflow with all output in Japanese.