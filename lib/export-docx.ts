import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  convertInchesToTwip,
  HeightRule,
} from 'docx';
import { ResumeData, ThemeConfig } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip leading '#' and return uppercase hex, e.g. '#2563eb' → '2563EB' */
function hex(color: string): string {
  return color.replace('#', '').toUpperCase();
}

/** Section heading paragraph — light bg fill + dark text, matching the UI */
function sectionHeading(title: string, theme: ThemeConfig): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 20, // 10pt
        color: hex(theme.headingTextColor),
        font: 'Calibri',
      }),
    ],
    shading: {
      type: ShadingType.SOLID,
      color: hex(theme.headingBgColor),
      fill: hex(theme.headingBgColor),
    },
    spacing: { before: 160, after: 80 },
    indent: { left: convertInchesToTwip(0.05), right: convertInchesToTwip(0.05) },
  });
}

/** Bold label + normal value on the same line */
function labelValue(label: string, value: string, theme: ThemeConfig): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' }),
      new TextRun({ text: value, size: 20, color: hex(theme.textColor), font: 'Calibri' }),
    ],
    spacing: { after: 40 },
  });
}

/** Plain body paragraph */
function body(text: string, theme: ThemeConfig, opts: { italic?: boolean; indent?: boolean; after?: number } = {}): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        color: hex(theme.textColor),
        italics: opts.italic,
        font: 'Calibri',
      }),
    ],
    indent: opts.indent ? { left: convertInchesToTwip(0.2) } : undefined,
    spacing: { after: opts.after ?? 60 },
  });
}

/** Horizontal rule as a bottom-bordered empty paragraph */
function divider(theme: ThemeConfig): Paragraph {
  return new Paragraph({
    children: [],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: hex(theme.primaryColor) + '40' },
    },
    spacing: { after: 80 },
  });
}

// ─── Section builders ─────────────────────────────────────────────────────────

function buildPersonalHeader(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  const { personalInfo, socialLinks } = data;
  const paras: Paragraph[] = [];

  paras.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Your Name',
          bold: true,
          size: 40, // 20pt
          color: hex(theme.primaryColor),
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { after: 60 },
    })
  );

  const contactParts = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.presentAddress,
    ...socialLinks.map((l) => l.url),
  ].filter(Boolean);

  if (contactParts.length > 0) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: 18,
            color: '6B7280',
            font: 'Calibri',
          }),
        ],
        spacing: { after: 120 },
      })
    );
  }

  paras.push(divider(theme));
  return paras;
}

function buildObjective(data: ResumeData, theme: ThemeConfig): (Paragraph)[] {
  if (!data.careerObjective) return [];
  return [
    sectionHeading('Career Objective', theme),
    body(data.careerObjective, theme, { after: 120 }),
  ];
}

function buildEducation(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.education.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Education', theme)];
  for (const edu of data.education) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: edu.degree, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' }),
          new TextRun({ text: `  ${edu.yearOfPassing}`, size: 18, color: '9CA3AF', font: 'Calibri' }),
        ],
        spacing: { after: 30 },
      })
    );
    const instParts = [edu.institution, edu.university].filter(Boolean).join(', ');
    if (instParts) paras.push(body(instParts, theme, { after: 30 }));
    const resultParts = [edu.cgpa && `CGPA: ${edu.cgpa}`, edu.grade && `Grade: ${edu.grade}`].filter(Boolean).join(' | ');
    if (resultParts) paras.push(body(resultParts, theme, { after: 80 }));
  }
  return paras;
}

function buildExperience(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.experience.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Work Experience', theme)];
  for (const exp of data.experience) {
    const dateRange = `${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate}`;
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: exp.designation, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' }),
          new TextRun({ text: `  ${dateRange}`, size: 18, color: '9CA3AF', font: 'Calibri' }),
        ],
        spacing: { after: 30 },
      })
    );
    paras.push(body(exp.organization, theme, { after: 40 }));
    if (exp.responsibilities) {
      const lines = exp.responsibilities.split('\n').filter(Boolean);
      for (const line of lines) {
        paras.push(body(line.trim(), theme, { indent: true, after: 30 }));
      }
    }
    paras.push(new Paragraph({ children: [], spacing: { after: 60 } }));
  }
  return paras;
}

function buildSkills(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.skills.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Skills', theme)];

  const technical = data.skills.filter((s) => s.category === 'Technical');
  const soft = data.skills.filter((s) => s.category === 'Soft');

  if (technical.length > 0) {
    paras.push(
      new Paragraph({
        children: [new TextRun({ text: 'Technical', bold: true, size: 18, color: '6B7280', font: 'Calibri' })],
        spacing: { after: 40 },
      })
    );
    for (const skill of technical) {
      const bar = '█'.repeat(Math.round(skill.level / 10)) + '░'.repeat(10 - Math.round(skill.level / 10));
      paras.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${skill.name.padEnd(20, ' ')}  `, size: 18, color: hex(theme.textColor), font: 'Courier New' }),
            new TextRun({ text: bar, size: 16, color: hex(theme.primaryColor), font: 'Courier New' }),
          ],
          spacing: { after: 30 },
        })
      );
    }
  }

  if (soft.length > 0) {
    paras.push(
      new Paragraph({
        children: [new TextRun({ text: 'Soft Skills', bold: true, size: 18, color: '6B7280', font: 'Calibri' })],
        spacing: { before: 80, after: 40 },
      })
    );
    paras.push(body(soft.map((s) => s.name).join('  ·  '), theme, { after: 80 }));
  }

  return paras;
}

function buildProjects(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.projects.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Projects', theme)];
  for (const proj of data.projects) {
    paras.push(
      new Paragraph({
        children: [new TextRun({ text: proj.title, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' })],
        spacing: { after: 30 },
      })
    );
    if (proj.technologies) paras.push(body(`Technologies: ${proj.technologies}`, theme, { after: 30 }));
    if (proj.description) paras.push(body(proj.description, theme, { after: 80 }));
  }
  return paras;
}

function buildCertifications(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.certifications.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Certifications', theme)];
  for (const cert of data.certifications) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: cert.title, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' }),
          cert.issuingOrganization
            ? new TextRun({ text: `  –  ${cert.issuingOrganization}`, size: 18, color: '6B7280', font: 'Calibri' })
            : new TextRun({ text: '' }),
          cert.issueDate
            ? new TextRun({ text: `  (${cert.issueDate})`, size: 18, color: '9CA3AF', font: 'Calibri' })
            : new TextRun({ text: '' }),
        ],
        spacing: { after: 50 },
      })
    );
  }
  return paras;
}

function buildTrainings(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.trainings.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Trainings', theme)];
  for (const t of data.trainings) {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({ text: t.title, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' }),
          t.institution ? new TextRun({ text: `  –  ${t.institution}`, size: 18, color: '6B7280', font: 'Calibri' }) : new TextRun({ text: '' }),
          t.year ? new TextRun({ text: `  (${t.year})`, size: 18, color: '9CA3AF', font: 'Calibri' }) : new TextRun({ text: '' }),
        ],
        spacing: { after: 50 },
      })
    );
  }
  return paras;
}

function buildLanguages(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.languages.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('Languages', theme)];
  paras.push(
    body(
      data.languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  ·  '),
      theme,
      { after: 80 }
    )
  );
  return paras;
}

function buildReferences(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.references.length === 0) return [];
  const paras: Paragraph[] = [sectionHeading('References', theme)];
  for (const ref of data.references) {
    paras.push(
      new Paragraph({
        children: [new TextRun({ text: ref.name, bold: true, size: 20, color: hex(theme.textColor), font: 'Calibri' })],
        spacing: { after: 20 },
      })
    );
    const role = [ref.designation, ref.organization].filter(Boolean).join(', ');
    if (role) paras.push(body(role, theme, { after: 20 }));
    if (ref.phone) paras.push(body(`Phone: ${ref.phone}`, theme, { after: 20 }));
    if (ref.email) paras.push(body(`Email: ${ref.email}`, theme, { after: 60 }));
  }
  return paras;
}

function buildInterests(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.interests.length === 0) return [];
  return [
    sectionHeading('Interests', theme),
    body(data.interests.map((i) => i.interest).join('  ·  '), theme, { after: 80 }),
  ];
}

function buildSocialLinks(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.socialLinks.length === 0) return [];
  return [
    sectionHeading('Social Links', theme),
    ...data.socialLinks.map((l) =>
      body(`${l.platform}: ${l.url}`, theme, { after: 40 })
    ),
  ];
}

function buildCustomSections(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (data.customSections.length === 0) return [];
  const paras: Paragraph[] = [];
  for (const section of data.customSections) {
    paras.push(sectionHeading(section.title, theme));
    paras.push(body(section.content, theme, { after: 80 }));
  }
  return paras;
}

function buildDeclaration(data: ResumeData, theme: ThemeConfig): Paragraph[] {
  if (!data.declaration.showDeclaration || !data.declaration.text) return [];
  const paras: Paragraph[] = [
    sectionHeading('Declaration', theme),
    body(data.declaration.text, theme, { italic: true, after: 200 }),
    new Paragraph({
      children: [new TextRun({ text: '____________________', size: 20, font: 'Calibri' })],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 40 },
    }),
  ];
  if (data.declaration.date) {
    paras.push(
      new Paragraph({
        children: [new TextRun({ text: data.declaration.date, size: 18, color: '6B7280', font: 'Calibri' })],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 80 },
      })
    );
  }
  return paras;
}

// ─── Section dispatcher ───────────────────────────────────────────────────────

function buildSection(id: string, data: ResumeData, theme: ThemeConfig): Paragraph[] {
  switch (id) {
    case 'personal':   return buildPersonalHeader(data, theme);
    case 'objective':  return buildObjective(data, theme);
    case 'education':  return buildEducation(data, theme);
    case 'experience': return buildExperience(data, theme);
    case 'skills':     return buildSkills(data, theme);
    case 'projects':   return buildProjects(data, theme);
    case 'certifications': return buildCertifications(data, theme);
    case 'trainings':  return buildTrainings(data, theme);
    case 'languages':  return buildLanguages(data, theme);
    case 'references': return buildReferences(data, theme);
    case 'interests':  return buildInterests(data, theme);
    case 'social':     return buildSocialLinks(data, theme);
    case 'custom':     return buildCustomSections(data, theme);
    case 'declaration': return buildDeclaration(data, theme);
    default: return [];
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function exportToDOCX(
  data: ResumeData,
  filename = 'resume.docx',
  theme?: ThemeConfig,
  sectionOrder?: string[],
  sectionVisibility?: Record<string, boolean>,
) {
  // Fallback defaults matching the professional preset
  const t: ThemeConfig = theme ?? {
    primaryColor: '#2563eb',
    textColor: '#1f2937',
    headingBgColor: '#dbeafe',
    headingTextColor: '#1e3a8a',
    fontFamily: 'Calibri',
    fontSize: 11,
    spacing: 12,
    borderRadius: 4,
    template: 'single-column',
    themePreset: 'professional',
  };

  const order = sectionOrder ?? [
    'personal', 'objective', 'education', 'experience', 'skills',
    'projects', 'certifications', 'trainings', 'languages',
    'references', 'interests', 'social', 'custom', 'declaration',
  ];

  const visibility = sectionVisibility ?? {};

  const children: Paragraph[] = [];

  for (const id of order) {
    if (visibility[id] === false) continue;
    const paras = buildSection(id, data, t);
    children.push(...paras);
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 20 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.6),
              bottom: convertInchesToTwip(0.6),
              left: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
