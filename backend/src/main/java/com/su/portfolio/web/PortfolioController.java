package com.su.portfolio.web;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/portfolio")
public class PortfolioController {

  @GetMapping
  public Map<String, Object> getPortfolioConfig() {
    return Map.of(
        "links",
        Map.of(
            "linkedin", "https://www.linkedin.com/in/su-shoon-lei-khaing-k280825",
            "github", "https://github.com/SuShoonLei",
            "email", "sushoonleikhaing04@gmail.com"),
        "certifications",
        Map.of("credentialUrl", "https://www.linkedin.com/in/su-shoon-lei-khaing-k280825"),
        "projects",
        Map.of(
            "allProjectsUrl", "https://github.com/SuShoonLei?tab=repositories",
            "linksByTitle",
            Map.of(
                "3D Hackathon Game",
                List.of(Map.of("label", "⭐ GitHub", "cls", "pl-gh", "href", "https://github.com/SuShoonLei")),
                "AI-Powered Web App",
                List.of(
                    Map.of("label", "⭐ GitHub", "cls", "pl-gh", "href", "https://github.com/SuShoonLei"),
                    Map.of("label", "🚀 Demo", "cls", "pl-live", "href", "https://github.com/SuShoonLei")),
                "Full-Stack Web Project",
                List.of(
                    Map.of("label", "⭐ GitHub", "cls", "pl-gh", "href", "https://github.com/SuShoonLei"),
                    Map.of("label", "🚀 Demo", "cls", "pl-live", "href", "https://github.com/SuShoonLei")),
                "Cybersecurity / Systems Project",
                List.of(Map.of("label", "⭐ GitHub", "cls", "pl-gh", "href", "https://github.com/SuShoonLei")))));
  }
}
