# 15-Picture Photo Challenge

A tiny static site for tracking a shared 15-prompt photography challenge between friends — any number of people, prompts done in any order. No build step, no accounts, no API keys.

## How it works

- `prompts.js` holds the 15 prompts and, for each one, a list of Instagram post URLs.
- `index.html` / `style.css` / `app.js` render those prompts as gallery cards and embed each Instagram post using Instagram's official embed widget.
- Prompts nobody has done yet show an "Awaiting photo" placeholder.

## Adding a photo

1. Post your photo to Instagram (make sure the post is public, or the embed won't render).
2. Copy the post's URL (the `https://www.instagram.com/p/.../` link).
3. Open `prompts.js`, find the matching prompt, and add the URL to its `posts` array, e.g.:
   ```js
   posts: ["https://www.instagram.com/p/ABC123/", "https://www.instagram.com/p/XYZ789/"],
   ```
4. Save, commit, and push. GitHub Pages redeploys automatically within a minute or two.

## Changing the prompts

The prompt list is just plain data in `prompts.js` — edit, reorder, add, or delete entries freely. Nothing else needs to change.

## Running locally

Just open `index.html` in a browser, or serve the folder so relative paths behave consistently:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `photo-challenge`).
2. From this folder:
   ```sh
   git init
   git add .
   git commit -m "Initial photo challenge site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the GitHub repo, go to **Settings → Pages**, set **Source** to "Deploy from a branch," pick the `main` branch and `/ (root)` folder, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute.
5. Any future push to `main` (e.g. after adding a new post URL) redeploys automatically.
