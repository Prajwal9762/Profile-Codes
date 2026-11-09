import React, { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  Github, 
  ExternalLink, 
  Search, 
  RotateCcw, 
  BookMarked, 
  Users, 
  UserCheck, 
  Star, 
  GitFork, 
  AlertCircle, 
  Loader2,
  Terminal
} from 'lucide-react';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export const ExperimentsSection: React.FC = () => {
  const tool = portfolioData.experiments[0];
  const shouldReduceMotion = useReducedMotion();

  // Search input & current active search query
  const [searchInput, setSearchInput] = useState(tool.defaultUsername);
  const [activeUsername, setActiveUsername] = useState(tool.defaultUsername);

  // Data fetching state
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [reposData, setReposData] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchGitHubData = useCallback(async (username: string) => {
    if (!username.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!userRes.ok) {
        if (userRes.status === 404) {
          throw new Error('GitHub user not found.');
        }
        if (userRes.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error('Unable to load GitHub data right now. Please try again.');
      }

      const userJson: GitHubUser = await userRes.json();
      setUserData(userJson);

      // 2. Fetch Public Repositories (sorted by updated, limit 6)
      const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username.trim())}/repos?sort=updated&per_page=6`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (reposRes.ok) {
        const reposJson: GitHubRepo[] = await reposRes.json();
        setReposData(reposJson);
      } else {
        setReposData([]);
      }
    } catch (err: unknown) {
      setUserData(null);
      setReposData([]);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unable to load GitHub data right now. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Automatically load Prajwal9762 on initial render
  useEffect(() => {
    fetchGitHubData(tool.defaultUsername);
  }, [fetchGitHubData, tool.defaultUsername]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() && searchInput.trim() !== activeUsername) {
      setActiveUsername(searchInput.trim());
      fetchGitHubData(searchInput.trim());
    } else if (searchInput.trim()) {
      fetchGitHubData(searchInput.trim());
    }
  };

  const handleResetToDefault = () => {
    setSearchInput(tool.defaultUsername);
    setActiveUsername(tool.defaultUsername);
    fetchGitHubData(tool.defaultUsername);
  };

  const transitionConfig = {
    duration: shouldReduceMotion ? 0.01 : 0.75,
    ease: [0.22, 1, 0.36, 1],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...transitionConfig,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  return (
    <motion.section
      id="experiments"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "-60px" }}
      className="py-16 md:py-24 border-t border-slate-200/80 bg-slate-100/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={childVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-amber-600 mb-2">
            04 / Experiments & Tools
          </p>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Experiments & Tools
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Small Utilities & API Practice
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
            A smaller experiment built while exploring APIs, distinct from primary project work.
          </p>
        </motion.div>

        {/* Experiment Item Container */}
        <motion.div
          variants={childVariants}
          className="rounded-2xl bg-white/95 border border-slate-200/90 overflow-hidden shadow-xs"
        >
          {/* Item Meta & Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
                    GitHub REST API
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-base text-slate-600 mt-2 leading-relaxed max-w-2xl">
                  {tool.description}
                </p>
              </div>

              {/* View Tool Link Button (Points to GITHUB_VIEWER_URL) */}
              <div className="shrink-0 self-start">
                <a
                  href={tool.toolUrl}
                  target={tool.toolUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors shadow-xs"
                >
                  <span>{tool.buttonLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter any GitHub username..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoading || !searchInput.trim()}
                  className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-slate-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Search</span>
                  )}
                </button>

                {activeUsername.toLowerCase() !== tool.defaultUsername.toLowerCase() && (
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    title={`Reset to ${tool.defaultUsername}`}
                    className="px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 text-sm transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Results Area */}
          <div className="p-6 sm:p-8 bg-slate-50/70">
            {/* Loading State */}
            {isLoading && (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <p className="text-sm font-mono">Fetching GitHub data from API...</p>
              </div>
            )}

            {/* Error State */}
            {!isLoading && errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Unable to fetch profile</h4>
                  <p className="text-xs mt-1 text-red-700 leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Success State */}
            {!isLoading && !errorMessage && userData && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-4">
                    <img
                      src={userData.avatar_url}
                      alt={userData.login}
                      className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {userData.name || userData.login}
                        </h4>
                        {userData.login === tool.defaultUsername && (
                          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                            Author
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-amber-600 font-medium">@{userData.login}</p>
                      {userData.bio && (
                        <p className="text-xs text-slate-600 mt-1.5 max-w-lg leading-relaxed">
                          {userData.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium self-start sm:self-auto transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Open GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>

                {/* Quick Profile Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
                    <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
                      <BookMarked className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-mono">Public Repos</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{userData.public_repos}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
                    <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-mono">Followers</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{userData.followers}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
                    <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
                      <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-mono">Following</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{userData.following}</span>
                  </div>
                </div>

                {/* Repositories Sublist */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                    <span>Public Repositories ({reposData.length})</span>
                    <span className="text-[11px] text-slate-400 normal-case">Sorted by recently updated</span>
                  </h4>

                  {reposData.length === 0 ? (
                    <p className="text-xs text-slate-500 p-4 rounded-lg bg-white border border-slate-200">
                      No public repositories found for this account.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {reposData.map((repo) => (
                        <a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-4 rounded-xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <h5 className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                                {repo.name}
                              </h5>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0" />
                            </div>

                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                              {repo.description || 'No description provided.'}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                            {repo.language && (
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                <span>{repo.language}</span>
                              </span>
                            )}
                            <span className="flex items-center gap-1 ml-auto">
                              <Star className="w-3 h-3 text-amber-500" />
                              <span>{repo.stargazers_count}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3 h-3 text-slate-400" />
                              <span>{repo.forks_count}</span>
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
