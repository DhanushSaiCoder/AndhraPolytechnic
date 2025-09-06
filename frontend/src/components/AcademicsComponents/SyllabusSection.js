import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";

import { Search, Download, Eye, FileText, AlertCircle, X } from "lucide-react";

import syllabusData from "../../data/syllabusData.json"; // adjust path if needed
import "../../styles/AcademicsStyles/Syllabus.css"; // custom styles

const SyllabusSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("c23");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchAllCurricula, setSearchAllCurricula] = useState(false);
  const [previewSubject, setPreviewSubject] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const curricula = syllabusData.curricula || [];

  // current curriculum and branches
  const currentCurriculum = useMemo(
    () => curricula.find((c) => c.id === selectedCurriculum) || curricula[0],
    [curricula, selectedCurriculum]
  );

  const availableBranches = currentCurriculum?.branches || [];

  // default branch when curriculum changes
  useEffect(() => {
    if (availableBranches.length > 0) {
      setSelectedBranch((prev) => (prev ? prev : availableBranches[0].id));
    } else {
      setSelectedBranch("");
    }
  }, [selectedCurriculum, availableBranches]);

  // Build filteredSubjects: array of { id, name, code, subjects: [...] } representing semesters
  const filteredSubjects = useMemo(() => {
    // no search and not searching across curricula -> show current branch semesters
    if (!searchQuery && !searchAllCurricula) {
      const branch = availableBranches.find((b) => b.id === selectedBranch);
      return branch?.semesters || [];
    }

    const q = (searchQuery || "").toLowerCase().trim();

    if (searchAllCurricula) {
      // flatten subjects across all curricula
      const allSubjects = [];
      curricula.forEach((curr) => {
        curr.branches.forEach((br) => {
          br.semesters.forEach((sem) => {
            sem.subjects.forEach((sub) => {
              if (
                !q ||
                (sub.name && sub.name.toLowerCase().includes(q)) ||
                (sub.code && sub.code.toLowerCase().includes(q)) ||
                (sub.description && sub.description.toLowerCase().includes(q))
              ) {
                allSubjects.push({
                  ...sub,
                  curriculum: curr.code,
                  branch: br.code,
                  semester: sem.name
                });
              }
            });
          });
        });
      });

      // group by curriculum-branch-semester
      const grouped = {};
      allSubjects.forEach((s) => {
        const key = `${s.curriculum}-${s.branch}-${s.semester}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(s);
      });

      return Object.entries(grouped).map(([key, subs]) => ({
        id: key,
        name: subs[0].semester,
        code: key,
        subjects: subs
      }));
    } else {
      // search inside current branch
      const branch = availableBranches.find((b) => b.id === selectedBranch);
      if (!branch) return [];

      return branch.semesters
        .map((sem) => ({
          ...sem,
          subjects: sem.subjects.filter(
            (sub) =>
              (sub.name && sub.name.toLowerCase().includes(q)) ||
              (sub.code && sub.code.toLowerCase().includes(q)) ||
              (sub.description && sub.description.toLowerCase().includes(q))
          )
        }))
        .filter((sem) => sem.subjects && sem.subjects.length > 0);
    }
  }, [searchQuery, searchAllCurricula, curricula, availableBranches, selectedBranch]);

  // update selected tab when filteredSubjects changes
  useEffect(() => {
    if (filteredSubjects && filteredSubjects.length > 0) {
      setSelectedTab(filteredSubjects[0].id);
    } else {
      setSelectedTab(null);
    }
  }, [filteredSubjects]);

  const handlePreview = (subject) => {
    setPreviewSubject(subject);
    setIsPreviewOpen(true);
  };

  const handleDownload = (subject) => {
    if (subject?.syllabus_pdf) {
      window.open(subject.syllabus_pdf, " ");
    }
  };

  const CurriculumPills = () => (
    <Stack direction="row" spacing={1} alignItems="center" className="curriculum-pills">
      {curricula.map((c) => (
        <Button
          key={c.id}
          variant={selectedCurriculum === c.id ? "contained" : "outlined"}
          onClick={() => {
            setSelectedCurriculum(c.id);
            setSearchAllCurricula(false);
          }}
          className={selectedCurriculum === c.id ? "pill contained-pill" : "pill"}
          size="small"
        >
          {c.code}
        </Button>
      ))}

      <Button
        variant={searchAllCurricula ? "contained" : "outlined"}
        onClick={() => setSearchAllCurricula((s) => !s)}
        className={searchAllCurricula ? "pill accent-pill" : "pill"}
        size="small"
      >
        Search all curricula
      </Button>
    </Stack>
  );

  const SubjectCard = ({ subject, showMetadata = false }) => {
    return (
      <Card className="subject-card">
        <CardHeader
          title={
            <Typography variant="h6" className="subject-title">
              {subject.name}
            </Typography>
          }
          subheader={
            subject.description ? (
              <Typography variant="body2" className="subject-desc">
                {subject.description}
              </Typography>
            ) : null
          }
        />
        <CardContent className="card-content">
          <div className="meta-row">
            {showMetadata && subject.curriculum && (
              <Typography variant="caption" className="meta-badge">
                {subject.curriculum}
              </Typography>
            )}
            {subject.code && <Typography variant="caption" className="meta-badge">{subject.code}</Typography>}
            {subject.version && <Typography variant="caption" className="meta-text">v{subject.version}</Typography>}
            {subject.last_updated && (
              <Typography variant="caption" className="meta-text">
                Updated {new Date(subject.last_updated).toLocaleDateString()}
              </Typography>
            )}
          </div>

          <div className="actions-row">
            {subject.syllabus_pdf ? (
              <>
                <Button
                  variant="contained"
                  className="btn-primary"
                  startIcon={<Eye />}
                  onClick={() => handlePreview(subject)}
                >
                  Preview
                </Button>

                <Button
                  variant="outlined"
                  className="btn-download"
                  startIcon={<Download />}
                  onClick={() => handleDownload(subject)}
                >
                  Download
                </Button>
              </>
            ) : (
              <div className="missing-row">
                <div className="missing-left">
                  <AlertCircle size={18} />
                  <Typography variant="body2" className="missing-text">Syllabus not uploaded yet</Typography>
                </div>
                <Button variant="outlined" size="small" className="btn-request">
                  Request
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className="syllabus-root">
      <Box className="container">
        <Typography variant="h4" className="page-title">Syllabus</Typography>

        <Box className="controls-row">
          <TextField
            placeholder="Search by subject name, code or keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            className="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              )
            }}
          />

          <CurriculumPills />
        </Box>

        {!searchAllCurricula && availableBranches.length > 0 && (
          <Box className="branch-row">
            <FormControl variant="outlined" size="small" className="branch-select">
              <Select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                {availableBranches.map((b) => (
                  <MenuItem key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <Box mt={3}>
          {filteredSubjects.length === 0 ? (
            <Box textAlign="center" py={8}>
              <FileText size={48} className="muted-icon" />
              <Typography variant="h6" mt={2}>
                {searchQuery ? `No results for "${searchQuery}"` : "No subjects available"}
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                {searchQuery
                  ? 'Try different keywords or enable "Search all curricula".'
                  : "Select a branch to view available subjects."}
              </Typography>
            </Box>
          ) : (
            <>
              <Tabs
                value={selectedTab}
                onChange={(e, v) => setSelectedTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                className="semester-tabs"
              >
                {filteredSubjects.map((sem) => (
                  <Tab key={sem.id} label={sem.name} value={sem.id} className="semester-tab" />
                ))}
              </Tabs>

              <Box mt={3}>
                {filteredSubjects.map((sem) => (
                  <div
                    key={sem.id}
                    role="tabpanel"
                    hidden={selectedTab !== sem.id}
                    aria-labelledby={`tab-${sem.id}`}
                  >
                    {selectedTab === sem.id && (
                      <Grid container spacing={3}>
                        {sem.subjects.map((sub) => (
                          <Grid item xs={12} sm={6} md={4} key={sub.id}>
                            <SubjectCard subject={sub} showMetadata={searchAllCurricula} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </div>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Dialog open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} maxWidth="lg" fullWidth>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <FileText size={18} />
                <Typography variant="subtitle1">{previewSubject?.name}</Typography>
              </Box>
              <IconButton onClick={() => setIsPreviewOpen(false)}>
                <X size={18} />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers className="pdf-dialog">
            {previewSubject?.syllabus_pdf ? (
              <iframe
                src={previewSubject.syllabus_pdf}
                title={`${previewSubject.name} Syllabus`}
                className="pdf-iframe"
              />
            ) : (
              <Box textAlign="center" py={8}>
                <FileText size={48} className="muted-icon" />
                <Typography variant="body1" mt={2}>
                  PDF preview not available
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Download the file to view.
                </Typography>
              </Box>
            )}
          </DialogContent>

          <Box display="flex" justifyContent="space-between" p={2} pt={1} borderTop="1px solid var(--s-border)">
            <Button variant="outlined" onClick={() => setIsPreviewOpen(false)} startIcon={<X />}>
              Close
            </Button>

            {previewSubject?.syllabus_pdf && (
              <Button variant="contained" color="success" onClick={() => handleDownload(previewSubject)} startIcon={<Download />}>
                Download PDF
              </Button>
            )}
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SyllabusSection;
