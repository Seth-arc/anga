// src/utils/githubStorage.ts
export const storeEmailInGithub = async (name: string, email: string): Promise<boolean> => {
    const repo_owner = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    const repo_name = process.env.NEXT_PUBLIC_EMAIL_REPO;
    const file_path = "data/emails.json";
    const base_url = `https://api.github.com/repos/${repo_owner}/${repo_name}/contents/${file_path}`;
  
    try {
      const response = await fetch(base_url, {
        headers: {
          "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });
  
      const existing_data = await response.json();
      const current_content = JSON.parse(atob(existing_data.content));
  
      current_content.subscribers.push({
        name,
        email,
        timestamp: new Date().toISOString()
      });
  
      current_content.metadata.lastUpdated = new Date().toISOString();
      current_content.metadata.totalCount = current_content.subscribers.length;
  
      const updated_content = btoa(JSON.stringify(current_content, null, 2));
  
      const update_response = await fetch(base_url, {
        method: 'PUT',
        headers: {
          "Authorization": `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add new subscriber: ${email}`,
          content: updated_content,
          sha: existing_data.sha
        })
      });
  
      return update_response.ok;
    } catch (error) {
      console.error("Error storing email:", error);
      return false;
    }
  };
  